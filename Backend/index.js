const express = require('express');
const fs = require('fs');
const path = require('path');
require('./db/config');
const cors = require('cors');

// Initialize express app first
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));

// Route imports
const userRoutes = require('./routes/user');
const mainRoutes = require('./routes'); // This imports routes/index.js

// Route middleware
app.use('/user', userRoutes); // All user routes prefixed with /user
app.use('/', mainRoutes); // All other routes

// Server start
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});