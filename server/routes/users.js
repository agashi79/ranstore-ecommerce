const express = require('express');
const router = express.Router();

// Update User Profile
router.put('/:userId', (req, res) => {
  const { name, email, phone, address, profilePhoto } = req.body;
  const userId = req.params.userId;

  // In real implementation, update in database
  const updatedUser = {
    id: userId,
    name: name || '',
    email: email || '',
    phone: phone || '',
    address: address || '',
    profilePhoto: profilePhoto || '/uploads/placeholder/default-profile.jpg'
  };

  res.json({
    success: true,
    message: 'Profil berhasil diperbarui',
    data: updatedUser
  });
});

// Change Password
router.post('/:userId/change-password', (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: 'Semua field harus diisi' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'Password baru tidak cocok' });
  }

  // In real implementation, verify old password and update
  res.json({
    success: true,
    message: 'Password berhasil diubah'
  });
});

// Upload Profile Photo
router.post('/:userId/upload-profile-photo', (req, res) => {
  // In real implementation, use multer for file upload
  res.json({
    success: true,
    message: 'Foto profil berhasil diunggah',
    profilePhotoUrl: '/uploads/profiles/user-' + req.params.userId + '-' + Date.now() + '.jpg'
  });
});

module.exports = router;
