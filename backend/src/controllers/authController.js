import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db/database.js';
import { config } from '../config/index.js';

export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body || {};
    const normalizedName = typeof name === 'string' ? name.trim() : '';
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!normalizedName || !normalizedEmail || typeof password !== 'string') {
      return res.status(400).json({ error: 'name, email, and password are required' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ error: 'please provide a valid email address' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'password must be at least 6 characters long' });
    }

    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail);
    if (existingUser) {
      return res.status(409).json({ error: 'an account with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    let result;
    try {
      result = db.prepare(`
        INSERT INTO users (name, email, password_hash)
        VALUES (?, ?, ?)
      `).run(normalizedName, normalizedEmail, passwordHash);
    } catch (insertError) {
      // A second signup request can pass the first lookup while the hash is being generated.
      if (/UNIQUE constraint failed: users\.email/i.test(insertError.message || '')) {
        return res.status(409).json({ error: 'an account with this email already exists' });
      }
      throw insertError;
    }

    const user = {
      id: result.lastInsertRowid,
      name: normalizedName,
      email: normalizedEmail
    };

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    return res.status(201).json({
      message: 'account created successfully',
      user,
      token
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!normalizedEmail || typeof password !== 'string' || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const user = db.prepare(
      'SELECT id, name, email, password_hash, created_at FROM users WHERE email = ?'
    ).get(normalizedEmail);

    if (!user) {
      return res.status(401).json({ error: 'invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    return res.json({
      message: 'signed in successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      },
      token
    });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    return res.json({ user: req.user });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res) {
  return res.json({ message: 'logged out successfully' });
}
