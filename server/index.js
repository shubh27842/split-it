const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/split-it', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('DB connected')).catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send("SPLIT IT RUNNING.....");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});