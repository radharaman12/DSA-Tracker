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

// Toggle Topic Progress Route
app.post('/api/progress', protect, async (req, res) => {
  try {
    const { topicId } = req.body;
    const user = req.user;

    if (!user.completedTopics) {
      user.completedTopics = [];
    }

    if (user.completedTopics.includes(topicId)) {
      user.completedTopics = user.completedTopics.filter(t => t !== topicId);
    } else {
      user.completedTopics.push(topicId);
    }
    
    await user.save();
    res.json({ completedTopics: user.completedTopics });
  } catch (error) {
    console.error("Progress Error:", error);
    res.status(500).json({ message: 'Error updating progress' });
  }
});

// Toggle Problem Progress Route
app.post('/api/problems/toggle', protect, async (req, res) => {
  try {
    const { problemId } = req.body;
    const user = req.user;

    if (!user.completedProblems) {
      user.completedProblems = [];
    }

    if (user.completedProblems.includes(problemId)) {
      user.completedProblems = user.completedProblems.filter(p => p !== problemId);
    } else {
      user.completedProblems.push(problemId);
    }

    await user.save();
    res.json({ completedProblems: user.completedProblems });
  } catch (error) {
    console.error("Problem Progress Error:", error);
    res.status(500).json({ message: 'Error updating problem progress' });
  }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
