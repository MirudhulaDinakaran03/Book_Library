const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
    origin: '*', // Allow all origins (adjust as needed)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change if needed
    password: 'bhuvipooja@31', // Ensure this is correct
    database: 'book_library'
});

// Connect to MySQL with error handling
db.connect(err => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        process.exit(1); // Exit process if DB fails
    }
    console.log("✅ MySQL Connected!");
});

// Get all books
app.get('/getBooks', (req, res) => {
    const sql = "SELECT * FROM books";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Error Fetching books:", err);
            return res.status(500).json({ error: "Error fetching books" });
        }
        res.json(results);
    });
});

// Add a new book
app.post('/addBook', (req, res) => {
    const { title, author, genre, year } = req.body;

    if (!title || !author || !genre || !year) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)";
    db.query(sql, [title, author, genre, year], (err, result) => {
        if (err) {
            console.error("❌ Error Adding book:", err);
            return res.status(500).json({ error: "Error adding book" });
        }
        res.json({ message: "✅ Book added successfully!" });
    });
});

// Server Start
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
