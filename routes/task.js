const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
let Tasks = require('../model/Tasks'); // Single import for Tasks
const { ObjectId } = require('mongodb');

/* GET users tasks */
router.get('/', async (req, res) => {
  try {
    const tasks = await Tasks.find(); // Fetch tasks from your database
    res.render('task', { title: 'Tasks', tasks }); // Pass tasks to the EJS template
  } catch (err) {
    res.status(500).send(err);
  }
});

/* GET add task form */
router.get('/add', (req, res) => {
  res.render('Tasks/add', { title: 'Add Task' }); 
});


/* POST add task */
router.post('/add', async (req, res) => {
  try {
    let newTask = new Tasks({
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

    if (!ObjectId.isValid(id)) {
      return res.status(400).send('Invalid Task ID');
    }

    const editTask = await Tasks.findById(id);
    if (!editTask) {
      return res.status(404).send('Task not found');
    }

    res.render('Tasks/edit', {
      title: 'Edit Task',
      task: editTask,
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

    await Tasks.findByIdAndUpdate(id, updatedTask);
    res.redirect('/tasks');
  } catch (err) {
    console.error(err);
    res.status(500).render('task', { 
      error: 'Error on the server',
    });
  }
});

/* GET delete task */
router.get('/delete/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Tasks.deleteOne({ _id: id });
    res.redirect('/tasks'); // Redirect to the tasks list after deletion
  } catch (error) {
    console.error(error); // Consistent variable usage
    res.status(500).render('Tasks/list', {
      error: 'Error on the server',
    });
  }
});

module.exports = router;
