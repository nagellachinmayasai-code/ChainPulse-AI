import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend build
app.use(express.static(path.join(__dirname, "dist")));

// Example API route
app.get("/api/insights", (req, res) => {
  res.json({
    insights: [
      "Demand rising in Chennai",
      "Delay risk from Mumbai supplier",
      "Switch to local supplier",
      "Optimize route via Hyderabad"
    ]
  });
});

// React routing fix
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
