const express = require('express');
const appContext = require('../appContext');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { app: appContext.app });
});

router.get('/about', function(req, res) {
  res.render('about', { app: appContext.app });
});

router.get('/contact', function(req, res) {
  res.render('contact', { app: appContext.app });
});

router.get('/post', function(req, res) {
  res.render('post', { app: appContext.app });
});

module.exports = router;
