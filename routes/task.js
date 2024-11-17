const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
let taskCreate = require('../model/taskCreate'); // Single import for taskCreate

/* GET users tasks */
router.get('/', async (req, res) => {
  try {
    const currenttasks = await taskCreate.find();
    res.render('task', { title: 'Tasks', currenttasks });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

/* GET add task form */
router.get('/add', (req, res) => {
  res.render('Tasks/add'); // Render the form page for adding a task
});

/* POST add task */
router.post('/add', async (req, res) => {
  try {
    let newTask = new taskCreate({
      description: req.body.description,
      due_by: req.body.due_by,
      name_task: req.body.name_task,
    });

    await newTask.save(); // Use .save() for a new document instance
    res.redirect('/tasks'); // Redirect to the main tasks page or desired path
  } catch (err) {
    console.error(err);
    res.status(500).render('Tasks/add', {
      error: 'Error on the server',
    });
  }
});

/* GET edit task form */
router.get('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const editTask = await taskCreate.findById(id);
    if (!editTask) {
      return res.status(404).send('Task not found');
    }
    res.render('Tasks/edit', {
      title: 'Edit Task',
      task: editTask, // Changed 'taskCreate' to 'task' for clarity
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

/* POST edit task */
router.post('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const updatedTask = {
      description: req.body.description,
      due_by: req.body.due_by,
      name_task: req.body.name_task,
    };

    await taskCreate.findByIdAndUpdate(id, updatedTask);
    res.redirect('/tasks');
  } catch (err) {
    console.error(err);
    res.status(500).render('Tasks/list', {
      error: 'Error on the server',
    });
  }
});

module.exports = router;
