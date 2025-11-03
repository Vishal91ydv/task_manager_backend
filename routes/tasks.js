const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// Create new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const task = new Task({
      user: req.user.id,
      title,
      description,
      status,
      dueDate,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Create Task error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get all tasks
router.get('/', auth, async (req, res) => {
  try {
    const filter = { user: req.user.id };
    const { status } = req.query;

    if (status) filter.status = status;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error('Get Task error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Update a task by ID
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const updates = req.body;
    Object.assign(task, updates);
    await task.save();

    res.json(task);
  } catch (err) {
    console.error('Update Task error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a task by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deleted) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Delete Task error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
