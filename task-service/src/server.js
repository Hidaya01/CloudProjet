require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/task.routes');

const app = express();
connectDB();

app.use(express.json());
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`🚀 Serveur task-service lancé sur le port ${PORT}`));
