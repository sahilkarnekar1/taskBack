const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Task = require('../models/Task');
// Route to add a task
// Route to add a task
router.post('/addTask', async (req, res) => {
    const { title, description, dueDate, id } = req.body;

    try {
        // Create a new task
        const task = new Task({
            title,
            description,
            dueDate,
            user: id
        });

        // Save the task
        await task.save();

        // Update the user's tasks array with the newly created task ID
        await User.findByIdAndUpdate(id, { $push: { tasks: task._id } });

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Route to get all tasks
router.get('/getTasks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const tasks = await Task.find({ user: id });
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Route to update a task
router.put('/updateTask/:id', async (req, res) => {
    const { title, description, dueDate,uid } = req.body;
    const taskFields = {};
    if (title) taskFields.title = title;
    if (description) taskFields.description = description;
    if (dueDate) taskFields.dueDate = dueDate;
  
    try {
      let task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ msg: 'Task not found' });
  
      // Check if the task belongs to the logged-in user
      if (task.user.toString() !== uid) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
  
      task = await Task.findByIdAndUpdate(req.params.id,
        { $set: taskFields },
        { new: true });
  
      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// Route to delete a task
router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const userId = req.headers.userid; // Accessing the user ID from the request headers
        const taskId = req.params.id;
  
        // Find the task by ID
        let task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
  
        // Check if the task belongs to the logged-in user
        if (task.user.toString() !== userId) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
  
        // Delete the task
        await Task.findByIdAndDelete(taskId);
  
        // Remove the task ID from the user's tasks array
        await User.findByIdAndUpdate(userId, {
            $pull: { tasks: taskId }
        });
  
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  });
  



module.exports = router;