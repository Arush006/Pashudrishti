import bcrypt from 'bcrypt';
import { generateToken } from '../middleware/auth.js';
import { executeQuery } from '../config/database.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    // Check if user exists
    const existingUser = await executeQuery(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await executeQuery(
      'INSERT INTO users (name, email, password, role, phone, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [name, email, hashedPassword, role || 'user', phone || '']
    );

    const user = await executeQuery(
      'SELECT id, name, email, role FROM users WHERE email = ?',
      [email]
    );

    const token = generateToken(user[0]);

    res.status(201).json({
      message: 'User registered successfully',
      user: user[0],
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const users = await executeQuery(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if doctor is approved
    if (user.role === 'doctor') {
      const doctors = await executeQuery(
        'SELECT * FROM doctors WHERE user_id = ?',
        [user.id]
      );

      if (doctors.length > 0 && doctors[0].status !== 'approved') {
        return res.status(403).json({ error: 'Doctor account not approved yet' });
      }
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};
