import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  console.log("-> /register called with email:", email);
  try {
    console.log("-> findOne");
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("-> userExists is true");
      return res.status(400).json({ message: 'User already exists' });
    }
    console.log("-> User.create");
    const user = await User.create({ email, password });
    console.log("-> user created", user._id);
    res.status(201).json({ _id: user._id, email: user.email, token: generateToken(user._id) });
  } catch (error) {
    console.error("-> catch block:", error);
    res.status(500).json({ message: 'Server Error', error: error.message, stack: error.stack });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({ _id: user._id, email: user.email, token: generateToken(user._id) });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
