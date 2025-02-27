const Expense = require('../models/Expense');

exports.createExpense = async (req, res) => {
    try{
        const { expenseName, amount, paidBy, participants, group} = req.body;
        const expense = new Expense({ expenseName, amount, paidBy, participants, group});
        await expense.save();
        res.status(201).json({ message: "Expense created successfully...", expense});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.updateExpense = async (req, res) => {
    try{
        const { expenseId, expenseName, amount, paidBy, participants} = req.body;
        const expense = await Expense.findByIdAndUpdate(expenseId,{
            expenseName, amount, paidBy, participants
        }, { new: true});
        // console.log(expense);
        if (!expense) return res.status(404).json({ message: "Expense not found" });
        res.json({ message: "Expense updated successfully", expense });
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.getExpenseById = async (req, res) => {
    try {
      const expense = await Expense.findById(req.params.id).populate("paidBy participants group");
      if (!expense) return res.status(404).json({ message: "Expense not found" });
      res.json(expense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.getExpensesByGroup = async (req, res) => {
    try{
    const expenses = await Expense.find({ group: req.params.groupId })
            .populate([
                {
                    path: 'paidBy',
                    select: 'name'
                },
                {
                    path: 'participants',
                    select: 'name'
                }
                ]).select('-group');
        if(expenses.length === 0) return res.json({ message: "No expense found..."});
        res.json(expenses);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.deleteExpense = async (req, res) => {
    try {
      await Expense.findByIdAndDelete(req.params.expenseId);
      res.json({ message: "Expense deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};