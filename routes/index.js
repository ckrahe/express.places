const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/about', function(req, res) {
  res.render('about', { title: 'Express' });
});
router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Express' });
});
router.get('/post', function(req, res) {
  res.render('post', { title: 'Express' });
});

module.exports = router;
