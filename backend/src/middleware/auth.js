import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import db from '../db/database.js';

export function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'unauthorized: missing or invalid authorization token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecret);

    const user = db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?').get(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'unauthorized: user not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'unauthorized: invalid or expired token' });
    }
    return res.status(500).json({ error: 'internal server error during authentication' });
  }
}
