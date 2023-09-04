// Load environment variables
require('dotenv').config();

// External imports
const express = require('express');

// Internal imports
const transactionRoutes = require('./src/routes/routes');

// Instantiate variables and objects
const app = express();
const { API_PORT } = process.env;

// Middleware
app.use(express.json()); // Allows us to post and get JSON from endpoints

// Routes
app.use('/lime', transactionRoutes);

// Start server
app.listen(API_PORT, () => console.log(`App listening on port ${API_PORT}`));