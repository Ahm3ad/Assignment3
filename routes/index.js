const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/tasks/add', function(req, res, next) {
  res.render('add', { title: 'Add' });
});

module.exports = router;
