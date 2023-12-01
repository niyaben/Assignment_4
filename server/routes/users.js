
// Importing the 'express' module
var express = require('express');

// Creating a router instance using Express
var router = express.Router();

/* GET users listing. */
// Handling GET requests to the root path ('/')
router.get('/', function(req, res, next) {
  // Sending the response with the message 'This is a user page'
  res.send('This is a user page');
});

// Exporting the router so that it can be used in other parts of the application
module.exports = router;
