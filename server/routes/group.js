const express = require('express');
const { createGroup, updateGroup, getGroupsByUser, deleteGroup } = require('../controllers/groupController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/createGroup', protect, createGroup);
router.post('/updateGroup', protect, updateGroup);
router.get('/getGroupsByUser/:userId', protect, getGroupsByUser);
router.delete('/deleteGroup/:id', protect, deleteGroup);

module.exports = router;