/**
 * Serverless API endpoint: /api/book-appointment
 *
 * Receives booking data from the website form, logs into VetsonCloud API,
 * creates a real appointment, and returns the result.
 *
 * VetsonCloud credentials are stored as Vercel environment variables:
 *   VETSONCLOUD_EMAIL    - login email
 *   VETSONCLOUD_PASSWORD - login password
 *
 * The org ID, location ID, and division ID are auto-fetched from the
 * VetsonCloud API after login.
 */

const VETSONCLOUD_API = "https://api.vetsoncloud.com";

/** Cache the VetsonCloud auth token + org info to avoid logging in on every request */
let cachedAuth = null;

/** Fetch with timeout helper */
async function fetchWithTimeout(url, options, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function getVetsonCloudAuth() {
  // Return cached auth if still valid
  if (cachedAuth && Date.now() < cachedAuth.expiresAt) {
    return cachedAuth;
  }

  const email = process.env.VETSONCLOUD_EMAIL;
  const password = process.env.VETSONCLOUD_PASSWORD;

  if (!email || !password) {
    throw new Error("VETSONCLOUD_EMAIL and VETSONCLOUD_PASSWORD environment variables are not set. Please set them in the Vercel dashboard: Settings > Environment Variables.");
  }

  // Step 1: Login
  const loginRes = await fetchWithTimeout(`${VETSONCLOUD_API}/Login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Email: email, Password: password }),
  });

  if (!loginRes.ok) {
    throw new Error(`VetsonCloud login HTTP error: ${loginRes.status}`);
  }

  const loginData = await loginRes.json();

  if (loginData.Status !== "Success" || !loginData.Data?.Login?.Token) {
    throw new Error(`VetsonCloud login failed: ${loginData.ErrorCode || loginData.Message || "Unknown error"}`);
  }

  const token = loginData.Data.Login.Token;
  const organisationId = String(loginData.Data.Login.OrganisationId);

  // Step 2: Get divisions (categories) and locations for this organisation
  let locationId = "";
  let categoryId = "";

  const divisionsRes = await fetchWithTimeout(`${VETSONCLOUD_API}/Organisations/${organisationId}/Divisions`, {
    headers: {
      Authorization: `BEARER ${token}`,
      Accept: "application/json",
    },
  });

  if (divisionsRes.ok) {
    const divisionsData = await divisionsRes.json();
    if (divisionsData.Data?.Divisions?.length > 0) {
      categoryId = String(divisionsData.Data.Divisions[0].Id);
    }
  }

  // Try to get locationId from login response
  if (loginData.Data.Login.Locations?.length > 0) {
    locationId = String(loginData.Data.Login.Locations[0].Id);
  }

  // If we still don't have a locationId, try fetching organisation info
  if (!locationId) {
    const orgRes = await fetchWithTimeout(`${VETSONCLOUD_API}/Organisations/${organisationId}`, {
      headers: {
        Authorization: `BEARER ${token}`,
        Accept: "application/json",
      },
    });
    if (orgRes.ok) {
      const orgData = await orgRes.json();
      if (orgData.Data?.Locations?.length > 0) {
        locationId = String(orgData.Data.Locations[0].Id);
      }
      if (!categoryId && orgData.Data?.Divisions?.length > 0) {
        categoryId = String(orgData.Data.Divisions[0].Id);
      }
    }
  }

  // Cache for 50 minutes
  cachedAuth = {
    token,
    organisationId,
    locationId,
    categoryId,
    expiresAt: Date.now() + 50 * 60 * 1000,
  };

  return cachedAuth;
}

function getSlotTimes(timeSlot) {
  const slotMap = {
    "Morning (9 AM - 12 PM)": { startTime: "09:00:00", endTime: "12:00:00" },
    "Afternoon (12 PM - 3 PM)": { startTime: "12:00:00", endTime: "15:00:00" },
    "Evening (3 PM - 9:30 PM)": { startTime: "15:00:00", endTime: "21:30:00" },
  };
  return slotMap[timeSlot] || { startTime: "09:00:00", endTime: "12:00:00" };
}

function mapPetType(petType) {
  const typeMap = {
    Dog: "Dog",
    Cat: "Cat",
    Bird: "Bird",
    Rabbit: "Rabbit",
    Other: "Other",
  };
  return typeMap[petType] || petType;
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ status: "error", message: "Method not allowed" }));
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { ownerName, phone, petName, petType, service, preferredDate, timeSlot, notes } = body;

    // Validate required fields
    if (!ownerName || !phone || !petName || !petType || !service || !preferredDate || !timeSlot) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ status: "error", message: "Missing required fields" }));
    }

    // Also notify clinic via Telegram
    try {
      const telegramNotifyUrl = `${req.headers["x-forwarded-proto"] || "https"}}://${req.headers.host}/api/telegram-notify`;
      await fetch(telegramNotifyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerName, phone, petName, petType, service, preferredDate, timeSlot, notes }),
      });
    } catch (_) {
      // Ignore — Telegram notification is best-effort
    }

    // Get VetsonCloud auth (auto-login with cached token)
    const auth = await getVetsonCloudAuth();

    // Build the appointment payload
    const { startTime, endTime } = getSlotTimes(timeSlot);
    const purpose = notes ? `${service} — ${notes}` : service;

    const appointmentPayload = {
      UserId: "",
      CountryID: 1,
      MobileNumber: phone,
      AppointmentStartTime: `${preferredDate}T${startTime}Z`,
      AppointmentEndTime: `${preferredDate}T${endTime}Z`,
      Purpose: purpose,
      IncidentId: "",
      PetId: "",
      LocationId: auth.locationId,
      LocationName: "",
      CategoryId: auth.categoryId,
      Latitude: 0,
      Longitude: 0,
      DisplayName: ownerName,
      PetName: petName,
      CountryCode: "+91",
      TypeOfPet: mapPetType(petType),
    };

    // Create the appointment in VetsonCloud
    const apptRes = await fetchWithTimeout(
      `${VETSONCLOUD_API}/Organisations/${auth.organisationId}/Appointments`,
      {
        method: "POST",
        headers: {
          Authorization: `BEARER ${auth.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(appointmentPayload),
      }
    );

    if (!apptRes.ok) {
      const errorText = await apptRes.text();
      throw new Error(`VetsonCloud appointment creation HTTP ${apptRes.status}: ${errorText}`);
    }

    const apptData = await apptRes.json();

    if (apptData.Status === "Success") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({
        status: "success",
        message: "Appointment created in VetsonCloud",
        data: apptData.Data,
      }));
    } else {
      let errorMessage = "Failed to create appointment in VetsonCloud";
      if (apptData.Data?.MobileNumber === "Mobile Number Already Exist.") {
        errorMessage = "This mobile number is already registered. Please use a different number or contact the clinic.";
      } else if (apptData.Data?.DisplayName === "DisplayName is required.") {
        errorMessage = "Owner name is required.";
      } else if (apptData.Message) {
        errorMessage = apptData.Message;
      }

      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ status: "error", message: errorMessage }));
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("[book-appointment] Error:", message);

    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({
      status: "error",
      message: "Could not connect to VetsonCloud. Please try again or call us directly.",
      debug: process.env.NODE_ENV === "development" ? message : undefined,
    }));
  }
}