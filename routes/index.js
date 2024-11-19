const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/Tasks/add', function(req, res, next) {
  res.render('index', { title: 'Add' });
});


module.exports = router;
