const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock Database
const users = [
  {
    id: 'admin-001',
    email: 'admin@ranstore.test',
    password: 'admin123',
    name: 'Administrator Ranstore',
    phone: '081519992955',
    address: 'Jl. Ranstore No. 1, Indonesia',
    role: 'admin',
    profilePhoto: '/uploads/placeholder/admin-profile.jpg'
  }
];

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email dan password harus diisi' });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Email atau password salah' });
  }

  res.json({
    success: true,
    message: 'Login berhasil',
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      profilePhoto: user.profilePhoto
    },
    token: `token_${user.id}_${Date.now()}`
  });
});

// Register
router.post('/register', (req, res) => {
  const { email, password, name, phone, address } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Nama, email, dan password harus diisi' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email sudah terdaftar' });
  }

  const newUser = {
    id: uuidv4(),
    email,
    password,
    name,
    phone: phone || '',
    address: address || '',
    role: 'customer',
    profilePhoto: '/uploads/placeholder/default-profile.jpg'
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: 'Registrasi berhasil',
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role
    }
  });
});

// Get Current User
router.get('/me/:userId', (req, res) => {
  const user = users.find(u => u.id === req.params.userId);

  if (!user) {
    return res.status(404).json({ error: 'User tidak ditemukan' });
  }

  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address,
      role: user.role,
      profilePhoto: user.profilePhoto
    }
  });
});

module.exports = router;
