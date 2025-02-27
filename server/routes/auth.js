const express = require('express');
const { register, login, logout, getMe, getAllUser, createMember } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.get('/getAllUser', protect, getAllUser);
router.post('/createUser', protect, createMember);

module.exports = router;