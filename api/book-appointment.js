/**
 * Serverless API endpoint: /api/book-appointment
 *
 * Receives booking data from the website form and sends a Telegram
 * notification to the clinic. That's it — no VetsonCloud.
 */

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  // Only allow POST
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.end(JSON.stringify({ status: "error", message: "Method not allowed" }));
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { ownerName, phone, petName, petType, service, preferredDate, timeSlot, notes } = body;

    // Validate required fields
    if (!ownerName || !phone || !petType || !service || !preferredDate || !timeSlot) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ status: "error", message: "Missing required fields" }));
    }

    // Send Telegram notification
    try {
      const telegramNotifyUrl = `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}/api/telegram-notify`;
      await fetch(telegramNotifyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerName, phone, petName, petType, service, preferredDate, timeSlot, notes }),
      });
    } catch (_) {
      // Best-effort — don't fail the booking if Telegram is down
    }

    res.statusCode = 200;
    return res.end(JSON.stringify({
      status: "success",
      message: "Appointment request received. We will call you to confirm.",
    }));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("[book-appointment] Error:", message);

    res.statusCode = 500;
    return res.end(JSON.stringify({
      status: "error",
      message: "Something went wrong. Please call us directly.",
    }));
  }
}