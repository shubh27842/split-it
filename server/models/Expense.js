const mongoose =  require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    expenseName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    participants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Expense", ExpenseSchema);
