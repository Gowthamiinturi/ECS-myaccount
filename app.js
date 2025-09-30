const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/login.html"));
});

// Handle login form
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).send("Internal Server Error");
      }
      if (results.length > 0) {
        res.sendFile(path.join(__dirname, "views/success.html"));
      } else {
        res.send("❌ Invalid credentials");
      }
    }
  );
});

app.listen(3000, () => {
  console.log("🚀 App running on port 3000");
});
