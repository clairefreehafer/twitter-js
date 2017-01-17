const express = require('express');
const router = express.Router();
// or: const router = require('express').Router();
// router entity is a box of routes, or a mini application
// capable of only performing middleware and routing functions.
// can replace app.VERB as router.VERB
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

// router.get('../public/stylesheets', function(req, res) {
//   res.sendFile('style.css');
// });

router.use(express.static('../public'));
// replaces router.get above
// serves all of the files in /public to the pages that need them
// instead of having to write res.sendFile() for every file

module.exports = router;
