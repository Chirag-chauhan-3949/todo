const express = require("express");
const app = express();
require("dotenv").config();
const todoRoutes = require("./routes/todoRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
