const express = require('express');
const Task = require('../models/taskModel');
const router = express.Router();

router.get('/', async (req, res) => {
    const tasks = await Task.find().populate('comments');
    res.json(tasks);
});

router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

router.put('/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

module.exports = router;