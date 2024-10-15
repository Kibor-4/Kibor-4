const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// MySQL Connection Setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // Update to your MySQL password
  database: 'anonymous_reports'
});

// Connect to the database
db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// Serve static files (optional for file access later)
app.use('/uploads', express.static('uploads'));

// Handle form submission
app.post('/submit-report', upload.single('attachment'), (req, res) => {
  const { category, description } = req.body;
  let attachment = null;

  if (req.file) {
    attachment = req.file.filename;
  }

  // Insert data into MySQL database
  const sql = 'INSERT INTO reports (category, description, attachment) VALUES (?, ?, ?)';
  db.query(sql, [category, description, attachment], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error submitting report' });
    }
    res.json({ message: 'Report submitted successfully' });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
