const express = require('express');
const { createGroup, updateGroup, getGroupsByUser, deleteGroup, getGroupById, getExpenseSummaryByGroup } = require('../controllers/groupController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/createGroup', protect, createGroup);
router.post('/updateGroup', protect, updateGroup);
router.get('/getGroup', protect, getGroupById);
router.get('/getGroupsByUser', protect, getGroupsByUser);
router.delete('/deleteGroup/:id', protect, deleteGroup);
router.get('/getBalanceSummary', protect, getExpenseSummaryByGroup);


module.exports = router;