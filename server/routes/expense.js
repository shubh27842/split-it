const express = require("express");
const router = express.Router();
const { createExpense, getExpenseById, updateExpense, deleteExpense, getExpensesByGroup } = require("../controllers/expenseController");
const { protect } = require("../middleware/auth");

router.post("/createExpense", protect, createExpense);
router.put("/updateExpense", protect, updateExpense);
router.get("/getExpense/:id", protect, getExpenseById);
router.get("/getExpenseByGroup/:groupId", protect, getExpensesByGroup);
router.delete("/deleteExpense/:expenseId", protect, deleteExpense);

module.exports = router;