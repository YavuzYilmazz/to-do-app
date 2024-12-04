const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
