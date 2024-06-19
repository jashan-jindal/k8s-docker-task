const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded({ extended: true }); // Explicitly set extended to true

const app = express();
app.use("/assets", express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "jashan",
    password: "j@shAn123",
    database: "nodejs"
});

// Connect to the database
connection.connect(function(error) {
    if (error) {
        console.error('Error connecting to MySQL:', error);
        return;
    }
    console.log('Connected to MySQL database successfully!');
});

// Handle root GET request
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

// Handle register POST request
app.post("/register", encoder, function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    try {
        connection.query("INSERT INTO loginuser (user_name, user_pass) VALUES (?, ?)", [username, password], function(error, results, fields) {
            if (error) {
                console.error('Error executing query:', error);
                res.redirect("/");
                return;
            }
            res.redirect("/");
        });
    } catch (e) {
        console.log(e);
        res.redirect("/");
    }
});

// Handle successful registration
app.get("/welcome", function(req, res) {
    res.sendFile(__dirname + "/welcome.html");
});

// Set app port
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log(`Server running on port ${PORT}`);
});
