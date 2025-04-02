const express = require('express');
const Comment = require('../models/commentModel');
const Task = require('../models/taskModel');
const router = express.Router();

router.post('/', async (req, res) => {
    const { taskId, body } = req.body;
    const comment = new Comment({ taskId, body });
    await comment.save();
    await Task.findByIdAndUpdate(taskId, { $push: { comments: comment._id } });
   
    res.json(comment);
});

router.get('/:taskId', async (req, res) => {
    const comments = await Comment.find({ taskId: req.params.taskId });
    res.json(comments);
});

router.delete('/:id', async (req, res) => {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted' });
});

module.exports = router;