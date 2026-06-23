// Simple test endpoint - using CommonJS format for maximum Vercel compatibility
module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({
    status: "ok",
    message: "API function is working",
    method: req.method,
    timestamp: new Date().toISOString(),
  }));
};