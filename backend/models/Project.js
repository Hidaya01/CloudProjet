const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    startDate: Date,
    endDate: Date,
    status: { type: String, enum: ['not started', 'in progress', 'completed'] },
    categories: [String]
});

module.exports = mongoose.model('Project', ProjectSchema);
