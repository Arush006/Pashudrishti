import bcrypt from 'bcrypt';
import { generateToken } from '../middleware/auth.js';
import { executeQuery } from '../config/database.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Normalize email (lowercase)
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists
    const existingUser = await executeQuery(
      'SELECT id FROM users WHERE LOWER(email) = ?',
      [normalizedEmail]
    );

    if (existingUser.length > 0) {
      console.log(`Registration attempt with existing email: ${normalizedEmail}`);
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await executeQuery(
      'INSERT INTO users (name, email, password, role, phone, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [name.trim(), normalizedEmail, hashedPassword, role || 'user', phone || '']
    );

    const newUser = await executeQuery(
      'SELECT id, name, email, role FROM users WHERE LOWER(email) = ?',
      [normalizedEmail]
    );

    if (newUser.length === 0) {
      return res.status(500).json({ error: 'User creation failed' });
    }

    const token = generateToken(newUser[0]);

    console.log(`New user registered: ${normalizedEmail} (role: ${role})`);

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser[0],
      token
    });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ error: 'Registration failed - ' + error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Normalize email (lowercase)
    const normalizedEmail = email.toLowerCase().trim();

    // Find user (case-insensitive)
    const users = await executeQuery(
      'SELECT * FROM users WHERE LOWER(email) = ?',
      [normalizedEmail]
    );

    if (users.length === 0) {
      console.log(`Login failed: User not found - ${normalizedEmail}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log(`Login failed: Wrong password for - ${normalizedEmail}`);
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

    console.log(`User logged in: ${normalizedEmail} (role: ${user.role})`);

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
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Login failed - ' + error.message });
  }
};
