const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock Database
const orders = [];

// Create Order
router.post('/', (req, res) => {
  const { userId, items, total, shippingAddress, phoneNumber } = req.body;

  if (!userId || !items || items.length === 0 || !total) {
    return res.status(400).json({ error: 'Data pesanan tidak lengkap' });
  }

  const newOrder = {
    id: `ORD-${uuidv4().substring(0, 8).toUpperCase()}`,
    userId,
    items,
    total,
    shippingAddress: shippingAddress || '',
    phoneNumber: phoneNumber || '',
    status: 'pending', // pending, processing, shipped, delivered, cancelled
    paymentMethod: 'transfer', // transfer, cash, others
    paymentStatus: 'unpaid', // unpaid, paid
    notes: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  orders.push(newOrder);

  res.status(201).json({
    success: true,
    message: 'Pesanan berhasil dibuat',
    data: newOrder,
    whatsappMessage: `Halo, saya ingin melakukan pemesanan:\n\nNo. Pesanan: ${newOrder.id}\nTotal: Rp ${total.toLocaleString('id-ID')}\n\nTerima kasih!`
  });
});

// Get User Orders
router.get('/user/:userId', (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.params.userId);

  res.json({
    success: true,
    data: userOrders,
    total: userOrders.length
  });
});

// Get Single Order
router.get('/:orderId', (req, res) => {
  const order = orders.find(o => o.id === req.params.orderId);

  if (!order) {
    return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
  }

  res.json({ success: true, data: order });
});

// Get All Orders (Admin)
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: orders,
    total: orders.length
  });
});

// Update Order Status (Admin)
router.put('/:orderId/status', (req, res) => {
  const { status } = req.body;
  const order = orders.find(o => o.id === req.params.orderId);

  if (!order) {
    return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
  }

  order.status = status || order.status;
  order.updatedAt = new Date();

  res.json({
    success: true,
    message: 'Status pesanan diperbarui',
    data: order
  });
});

module.exports = router;
