// Simple test endpoint to verify Vercel functions work
export default function handler(req: { method?: string }) {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status: "ok",
      message: "API function is working",
      method: req.method,
      timestamp: new Date().toISOString(),
    }),
  };
}