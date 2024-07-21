const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// @route   POST /tasks
// @desc    Create a new task
// @access  Public
router.post('/', async (req, res) => {
  const { user, title, description, status } = req.body;

  try {
    const newTask = new Task({
      user,
      title,
      description,
      status,
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /tasks/:id
// @desc    Update a task
// @access  Public
router.put('/:id', async (req, res) => {
  const { title, description, status } = req.body;

  // Build task object
  const taskFields = {};
  if (title) taskFields.title = title;
  if (description) taskFields.description = description;
  if (status) taskFields.status = status;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /tasks
// @desc    Get all tasks
// @route   GET api/tasks
// @desc    Get all tasks sorted by most recent date
// @access  Public
router.get('/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.userId })
      .populate('user', ['name', 'email'])
      .sort({ date: -1 }); // Sort by date in descending order (most recent first)
      
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
