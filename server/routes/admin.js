const express = require('express');
const router = express.Router();

// Admin Dashboard
router.get('/dashboard', (req, res) => {
  const dashboard = {
    totalOrders: 156,
    totalRevenue: 2450000000,
    totalProducts: 87,
    totalCategories: 4,
    pendingOrders: 12,
    totalCustomers: 234,
    monthlyRevenue: [
      { month: 'Jan', revenue: 250000000 },
      { month: 'Feb', revenue: 280000000 },
      { month: 'Mar', revenue: 320000000 },
      { month: 'Apr', revenue: 290000000 },
      { month: 'May', revenue: 350000000 },
      { month: 'Jun', revenue: 360000000 }
    ],
    topProducts: [
      { id: 'prod-001', name: 'Laptop Gaming Pro', sold: 45 },
      { id: 'prod-002', name: 'Smartphone X Pro Max', sold: 78 },
      { id: 'prod-003', name: 'Keyboard Gaming RGB', sold: 52 }
    ]
  };

  res.json({
    success: true,
    data: dashboard
  });
});

// Get Banner
router.get('/banner', (req, res) => {
  const banner = {
    id: 'banner-001',
    title: 'Selamat Datang di Ranstore',
    subtitle: 'Toko online terpercaya untuk kebutuhan elektronik Anda',
    image: '/uploads/placeholder/banner.jpg',
    cta: 'Belanja Sekarang',
    ctaLink: '/products'
  };

  res.json({ success: true, data: banner });
});

// Update Banner (Admin)
router.put('/banner/:bannerId', (req, res) => {
  const { title, subtitle, image, cta, ctaLink } = req.body;

  const updatedBanner = {
    id: req.params.bannerId,
    title: title || 'Selamat Datang di Ranstore',
    subtitle: subtitle || 'Toko online terpercaya untuk kebutuhan elektronik Anda',
    image: image || '/uploads/placeholder/banner.jpg',
    cta: cta || 'Belanja Sekarang',
    ctaLink: ctaLink || '/products'
  };

  res.json({
    success: true,
    message: 'Banner berhasil diperbarui',
    data: updatedBanner
  });
});

// Upload Banner Image (Admin)
router.post('/banner/upload', (req, res) => {
  // In real implementation, use multer for file upload
  res.json({
    success: true,
    message: 'Banner image berhasil diunggah',
    imageUrl: '/uploads/banner/banner-' + Date.now() + '.jpg'
  });
});

// Upload Product Images (Admin)
router.post('/products/upload-images', (req, res) => {
  // In real implementation, use multer for file upload
  // Max 12 images per product
  res.json({
    success: true,
    message: 'Foto produk berhasil diunggah',
    imageUrls: [
      '/uploads/products/prod-' + Date.now() + '-1.jpg',
      '/uploads/products/prod-' + Date.now() + '-2.jpg'
    ]
  });
});

// Upload Product Video (Admin)
router.post('/products/upload-video', (req, res) => {
  // In real implementation, use multer for file upload
  // Max 1 video per product
  res.json({
    success: true,
    message: 'Video produk berhasil diunggah',
    videoUrl: '/uploads/videos/prod-' + Date.now() + '.mp4'
  });
});

module.exports = router;
