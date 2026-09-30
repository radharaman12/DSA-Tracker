import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { protect } from './middleware/authMiddleware.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allows the frontend to make requests to this backend
app.use(express.json()); // Allows the backend to parse incoming JSON data (req.body)

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch((err) => console.error('❌ MongoDB Connection Failed:', err));

// Routes
app.use('/api/auth', authRoutes);

// Example of a Protected Route
app.get('/api/profile', protect, (req, res) => {
  // If the token is valid, the 'protect' middleware adds the user to req.user
  res.json({ message: 'This is protected data!', user: req.user });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
