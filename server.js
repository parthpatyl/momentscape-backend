const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

// Fix CORS configuration - remove the trailing slash and allow multiple origins
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    const allowedOrigins = [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      // Add your production frontend URL here, for example:
      // 'https://your-frontend-domain.com'
    ];
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      callback(null, true); // Temporarily allow all origins for debugging
    }
  },
  credentials: true
}));

// MongoDB connection with better error handling
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    // You might want to exit the process in production
    // process.exit(1);
  });

const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);

// Add a root endpoint for testing
app.get('/', (req, res) => {
  res.send('Notes API is running');
});

// Add a test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API connection successful' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);