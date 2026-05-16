const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://skynexes-ui.vercel.app",
      "https://skynexes-fwzyxx3h8-prashdevcodes-projects.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/contact", require("./routes/contact.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/blog", require("./routes/blog.routes"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "SkyNexes API is running" });
});

// Error middleware
app.use(require("./middleware/error.middleware"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 SkyNexes API running on port ${PORT}`);
});
