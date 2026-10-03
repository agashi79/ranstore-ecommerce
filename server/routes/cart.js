const express = require('express');
const router = express.Router();

// Mock Database - Carts per user
const carts = {};

// Get Cart
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const cart = carts[userId] || { items: [], total: 0 };

  res.json({
    success: true,
    data: cart
  });
});

// Add to Cart
router.post('/:userId/add', (req, res) => {
  const { userId } = req.params;
  const { productId, quantity, price, productName, productImage } = req.body;

  if (!productId || !quantity || !price) {
    return res.status(400).json({ error: 'Data produk tidak lengkap' });
  }

  if (!carts[userId]) {
    carts[userId] = { items: [], total: 0 };
  }

  const existingItem = carts[userId].items.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += parseInt(quantity);
  } else {
    carts[userId].items.push({
      productId,
      productName,
      productImage,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      subtotal: parseFloat(price) * parseInt(quantity)
    });
  }

  // Calculate total
  carts[userId].total = carts[userId].items.reduce((sum, item) => sum + item.subtotal, 0);

  res.json({
    success: true,
    message: 'Produk ditambahkan ke keranjang',
    data: carts[userId]
  });
});

// Update Cart Item Quantity
router.put('/:userId/update/:productId', (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  if (!carts[userId]) {
    return res.status(404).json({ error: 'Keranjang tidak ditemukan' });
  }

  const item = carts[userId].items.find(item => item.productId === productId);

  if (!item) {
    return res.status(404).json({ error: 'Item tidak ditemukan di keranjang' });
  }

  if (quantity <= 0) {
    carts[userId].items = carts[userId].items.filter(item => item.productId !== productId);
  } else {
    item.quantity = parseInt(quantity);
    item.subtotal = item.price * item.quantity;
  }

  carts[userId].total = carts[userId].items.reduce((sum, item) => sum + item.subtotal, 0);

  res.json({
    success: true,
    message: 'Keranjang diperbarui',
    data: carts[userId]
  });
});

// Remove from Cart
router.delete('/:userId/remove/:productId', (req, res) => {
  const { userId, productId } = req.params;

  if (!carts[userId]) {
    return res.status(404).json({ error: 'Keranjang tidak ditemukan' });
  }

  carts[userId].items = carts[userId].items.filter(item => item.productId !== productId);
  carts[userId].total = carts[userId].items.reduce((sum, item) => sum + item.subtotal, 0);

  res.json({
    success: true,
    message: 'Item dihapus dari keranjang',
    data: carts[userId]
  });
});

// Clear Cart
router.delete('/:userId/clear', (req, res) => {
  const { userId } = req.params;

  if (carts[userId]) {
    carts[userId] = { items: [], total: 0 };
  }

  res.json({
    success: true,
    message: 'Keranjang dikosongkan',
    data: carts[userId]
  });
});

module.exports = router;
