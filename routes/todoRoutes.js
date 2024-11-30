const express = require("express");
const router = express.Router();
const db = require("../db");

// Create a new To-Do
router.post("/", (req, res) => {
  const { title, description, status } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const query = "INSERT INTO todo (title, description, status) VALUES (?, ?, ?)";
  db.query(query, [title, description, status || "pending"], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, title, description, status });
  });
});

// Get all To-Dos
router.get("/", (req, res) => {
  db.query("SELECT * FROM todo", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get a single To-Do by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM todo WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "To-Do not found" });
    }
    res.json(results[0]);
  });
});

// Update a To-Do by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const query = "UPDATE todo SET title = ?, description = ?, status = ? WHERE id = ?";
  db.query(query, [title, description, status, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "To-Do not found" });
    }
    res.json({ message: "To-Do updated successfully" });
  });
});

// Delete a To-Do by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM todo WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "To-Do not found" });
    }
    res.json({ message: "To-Do deleted successfully" });
  });
});

module.exports = router;
