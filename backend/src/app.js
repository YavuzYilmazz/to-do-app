const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
const path = require('path');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
