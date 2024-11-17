const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
let taskCreate = require('../model/taskCreate');
const task = require('../model/taskCreate');


/* GET users tasks. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
