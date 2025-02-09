const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/group');
const expenseRoutes = require('./routes/expense');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/group', groupRoutes);
app.use('/expense', expenseRoutes);

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('DB connected')).catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send("SPLIT IT RUNNING.....");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});