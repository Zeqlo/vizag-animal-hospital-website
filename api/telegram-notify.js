/**
 * Serverless API endpoint: /api/telegram-notify
 *
 * Sends a Telegram bot message with booking details to a configured chat.
 *
 * Environment variables:
 *   TELEGRAM_BOT_TOKEN - Bot token from @BotFather (https://t.me/BotFather)
 *     1. Open Telegram and message @BotFather
 *     2. Send /newbot and follow the prompts
 *     3. Copy the token (e.g. "123456789:ABCdefGhi...")
 *
 *   TELEGRAM_CHAT_ID - The chat ID to send messages to
 *     1. Send any message to your bot in Telegram
 *     2. Visit https://api.telegram.org/bot<TOKEN>/getUpdates in a browser
 *     3. Look for "chat":{"id":123456789} in the JSON response
 *     4. Use that number as TELEGRAM_CHAT_ID
 *
 * - POST: { ownerName, phone, petName, petType, service, preferredDate, timeSlot, notes }
 */

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  try {
    if (req.method !== "POST") {
      return res.status(405).json({ status: "error", message: "Method not allowed" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { ownerName, phone, petName, petType, service, preferredDate, timeSlot, notes } = body;

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // If Telegram is not configured, acknowledge gracefully without crashing
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return res.status(200).json({
        status: "ok",
        message: "Telegram not configured - booking received but no notification sent",
      });
    }

    const message = [
      "New Appointment Booking:",
      "",
      `Owner: ${ownerName || "N/A"}`,
      `Pet: ${petName || "N/A"} (${petType || "N/A"})`,
      `Service: ${service || "N/A"}`,
      `Date: ${preferredDate || "N/A"}`,
      `Time: ${timeSlot || "N/A"}`,
      `Phone: ${phone || "N/A"}`,
      `Notes: ${notes || "N/A"}`,
    ].join("\n");

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramRes = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    });

    if (!telegramRes.ok) {
      const errorText = await telegramRes.text();
      console.error("[telegram-notify] Telegram API error:", telegramRes.status, errorText);
      return res.status(500).json({
        status: "error",
        message: "Failed to send Telegram notification",
        detail: errorText,
      });
    }

    const telegramData = await telegramRes.json();

    if (!telegramData.ok) {
      console.error("[telegram-notify] Telegram API returned not ok:", telegramData);
      return res.status(500).json({
        status: "error",
        message: "Telegram API returned an error",
        detail: telegramData.description || "Unknown error",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Telegram notification sent",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("[telegram-notify] Error:", message);
    return res.status(500).json({ status: "error", message });
  }
}