const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock Database
const categories = [
  {
    id: 'cat-001',
    name: 'Laptop & Komputer',
    description: 'Semua jenis laptop dan komputer',
    icon: '💻',
    productCount: 8
  },
  {
    id: 'cat-002',
    name: 'Smartphone',
    description: 'Smartphone terbaru dan terpopuler',
    icon: '📱',
    productCount: 15
  },
  {
    id: 'cat-003',
    name: 'Aksesoris',
    description: 'Aksesoris elektronik dan gadget',
    icon: '🎧',
    productCount: 42
  },
  {
    id: 'cat-004',
    name: 'Gaming',
    description: 'Peralatan gaming profesional',
    icon: '🎮',
    productCount: 25
  }
];

// Get All Categories
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: categories,
    total: categories.length
  });
});

// Get Single Category
router.get('/:id', (req, res) => {
  const category = categories.find(c => c.id === req.params.id);

  if (!category) {
    return res.status(404).json({ error: 'Kategori tidak ditemukan' });
  }

  res.json({ success: true, data: category });
});

// Create Category (Admin)
router.post('/', (req, res) => {
  const { name, description, icon } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Nama kategori harus diisi' });
  }

  const newCategory = {
    id: `cat-${uuidv4()}`,
    name,
    description: description || '',
    icon: icon || '📦',
    productCount: 0
  };

  categories.push(newCategory);

  res.status(201).json({
    success: true,
    message: 'Kategori berhasil ditambahkan',
    data: newCategory
  });
});

// Update Category (Admin)
router.put('/:id', (req, res) => {
  const category = categories.find(c => c.id === req.params.id);

  if (!category) {
    return res.status(404).json({ error: 'Kategori tidak ditemukan' });
  }

  Object.assign(category, req.body, { id: category.id });

  res.json({
    success: true,
    message: 'Kategori berhasil diperbarui',
    data: category
  });
});

// Delete Category (Admin)
router.delete('/:id', (req, res) => {
  const index = categories.findIndex(c => c.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Kategori tidak ditemukan' });
  }

  const deleted = categories.splice(index, 1);

  res.json({
    success: true,
    message: 'Kategori berhasil dihapus',
    data: deleted[0]
  });
});

module.exports = router;
