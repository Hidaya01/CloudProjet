const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    deadline: Date,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('Task', TaskSchema);