import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header is present and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token (Format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify and decode the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user in the database by the ID inside the token, exclude the password
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move to the next middleware/route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
