/**
 * Serverless API endpoint: /api/send-message
 *
 * Sends a contact message from the website form to the clinic's Telegram bot.
 *
 * POST: { name, phone, message }
 */

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.end(JSON.stringify({ status: "error", message: "Method not allowed" }));
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ status: "error", message: "Missing required fields" }));
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_IDS = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_IDS) {
      res.statusCode = 200;
      return res.end(JSON.stringify({
        status: "success",
        message: "Message received. We will call you back shortly.",
      }));
    }

    const chatIds = TELEGRAM_CHAT_IDS.split(",").map((id) => id.trim()).filter(Boolean);

    const text = [
      "New Message from Website:",
      "",
      `Name: ${name || "N/A"}`,
      `Phone: ${phone || "N/A"}`,
      `Message: ${message || "N/A"}`,
    ].join("\n");

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const results = await Promise.allSettled(
      chatIds.map((chatId) =>
        fetch(telegramUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
        }).then((r) => r.json()),
      ),
    );

    const succeeded = results.filter((r) => r.status === "fulfilled" && r.value?.ok).length;

    if (succeeded === 0) {
      console.error("[send-message] All Telegram sends failed:", results);
      return res.status(500).json({ status: "error", message: "Failed to send message" });
    }

    res.statusCode = 200;
    return res.end(JSON.stringify({
      status: "success",
      message: "Message sent to clinic. We will call you back shortly.",
    }));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("[send-message] Error:", message);
    res.statusCode = 500;
    return res.end(JSON.stringify({ status: "error", message: "Something went wrong. Please call us directly." }));
  }
}