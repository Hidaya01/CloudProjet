const express = require('express');
const app = express();
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projects');
const categoryRoutes = require('./routes/categories');

mongoose.connect('mongodb://localhost:27017/CloudProject');

app.use(express.json());
app.use('/projects', projectRoutes);
app.use('/categories', categoryRoutes);

app.listen(3000, () => {
  console.log('Project Management Service listening on port 3000');
});

