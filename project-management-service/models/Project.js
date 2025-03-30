const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  status: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
