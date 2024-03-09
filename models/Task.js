// models/Task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
