const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); // Exit on connection failure
  } else {
    console.log("Connected to the database.");
  }
});

// Create the 'todo' table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS todo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'completed') DEFAULT 'pending'
);
`;

db.query(createTableQuery, (err, results) => {
  if (err) {
    console.error("Error creating table:", err.message);
  } else {
    console.log("Table 'todo' is ready.");
  }
});

module.exports = db;
