/**
 * Serverless API endpoint: /api/subscribe
 *
 * Handles newsletter subscriptions.
 * - POST: { email } — adds email to data/subscribers.json (prevents duplicates)
 * - GET:  returns the list of subscribers
 *
 * Data is stored in a JSON file at data/subscribers.json.
 */

import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "subscribers.json");

function ensureDataDir() {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    // Directory may already exist — ignore EEXIST
  }
}

function readSubscribers() {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeSubscribers(list) {
  ensureDataDir();
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(list, null, 2), "utf-8");
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  try {
    if (req.method === "GET") {
      const subscribers = readSubscribers();
      return res.status(200).json(subscribers);
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const { email } = body;

      if (!email || !email.includes("@")) {
        return res.status(400).json({ status: "error", message: "Valid email is required" });
      }

      const subscribers = readSubscribers();

      // Prevent duplicates
      if (subscribers.some((s) => s.email === email)) {
        return res.status(200).json({ status: "success", message: "Already subscribed" });
      }

      subscribers.push({
        email,
        subscribedAt: new Date().toISOString(),
      });

      writeSubscribers(subscribers);

      return res.status(200).json({ status: "success", message: "Subscribed successfully" });
    }

    return res.status(405).json({ status: "error", message: "Method not allowed" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("[subscribe] Error:", message);
    return res.status(500).json({ status: "error", message });
  }
}