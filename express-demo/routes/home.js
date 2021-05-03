const express = require('express');
const router = express.Router();

//get method takes two arguments: path or url, callback function(it called when we have a http get request to this endpoint)
// (req ,res) -> route handler function/Middleware function '/..' -> route parameters
router.get('/', (req, res) => {
  res.render('index', { title: 'My Express App', message: 'Hello'});
});

module.exports = router;
