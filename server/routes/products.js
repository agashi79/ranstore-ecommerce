const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock Database
const products = [
  {
    id: 'prod-001',
    categoryId: 'cat-001',
    name: 'Laptop Gaming Pro',
    description: 'Laptop gaming dengan performa tinggi untuk kebutuhan gaming dan design',
    price: 12500000,
    stock: 5,
    photos: [
      '/uploads/placeholder/product-1.jpg',
      '/uploads/placeholder/product-2.jpg'
    ],
    video: '/uploads/placeholder/product-demo.mp4',
    rating: 4.5,
    reviews: 24,
    createdAt: new Date()
  },
  {
    id: 'prod-002',
    categoryId: 'cat-002',
    name: 'Smartphone X Pro Max',
    description: 'Smartphone flagship dengan kamera 200MP dan battery 6000mAh',
    price: 8999000,
    stock: 15,
    photos: [
      '/uploads/placeholder/product-3.jpg',
      '/uploads/placeholder/product-4.jpg'
    ],
    video: '/uploads/placeholder/product-demo.mp4',
    rating: 4.8,
    reviews: 156,
    createdAt: new Date()
  }
];

// Get All Products
router.get('/', (req, res) => {
  const { categoryId, search } = req.query;

  let filtered = [...products];

  if (categoryId) {
    filtered = filtered.filter(p => p.categoryId === categoryId);
  }

  if (search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json({
    success: true,
    data: filtered,
    total: filtered.length
  });
});

// Get Single Product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ error: 'Produk tidak ditemukan' });
  }

  res.json({ success: true, data: product });
});

// Create Product (Admin)
router.post('/', (req, res) => {
  const { categoryId, name, description, price, stock } = req.body;

  if (!categoryId || !name || !price || stock === undefined) {
    return res.status(400).json({ error: 'Data produk tidak lengkap' });
  }

  const newProduct = {
    id: `prod-${uuidv4()}`,
    categoryId,
    name,
    description: description || '',
    price: parseFloat(price),
    stock: parseInt(stock),
    photos: [],
    video: null,
    rating: 0,
    reviews: 0,
    createdAt: new Date()
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: 'Produk berhasil ditambahkan',
    data: newProduct
  });
});

// Update Product (Admin)
router.put('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ error: 'Produk tidak ditemukan' });
  }

  Object.assign(product, req.body, { id: product.id, createdAt: product.createdAt });

  res.json({
    success: true,
    message: 'Produk berhasil diperbarui',
    data: product
  });
});

// Delete Product (Admin)
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Produk tidak ditemukan' });
  }

  const deleted = products.splice(index, 1);

  res.json({
    success: true,
    message: 'Produk berhasil dihapus',
    data: deleted[0]
  });
});

module.exports = router;
