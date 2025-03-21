const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    deadline: { type: Date },
    status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attachments: [{ type: String }], // URLs des fichiers joints
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
