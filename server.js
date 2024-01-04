// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const postRoutes = require('./routes/posts');

// Create an Express app
const app = express();

app.use(cors());

// Middleware for parsing incoming request bodies in JSON format
app.use(express.json());

// Custom middleware to log request path and method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Define routes
app.use('/api/posts', postRoutes); // Use postRoutes for '/api/posts' endpoint

// Example route to test the working of the app
app.get('/', (req, res) => {
   // Respond with a JSON message indicating the app is working
   res.json({ msg: 'CHAAAA' });
});

// Connect to MongoDB using the provided MONGO_URL from environment variables
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
   .then(() => {
      // If connected successfully, start the Express app to listen on the specified PORT
      app.listen(process.env.PORT, () => {
         console.log('Connected to Mongo_Url and Running on Port', process.env.PORT);
      });
   })
   .catch((error) => {
      // If an error occurs during database connection, log the error
      console.log(error);
   });
