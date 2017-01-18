module.exports = function(io) {

  const express = require('express');
  const router = express.Router(); // returns new router instance
  const bodyParser = require('body-parser');
  // or: const router = require('express').Router();
  // router entity is a box of routes, or a mini application
  // capable of only performing middleware and routing functions.
  // can replace app.VERB as router.VERB
  const tweetBank = require('../tweetBank');

  const jsonParser = bodyParser.json();
  const urlencodedParser = bodyParser.urlencoded({ extended: false });

  router.get('/', function (req, res) { // if asked for the index, execute this function
    let allTheTweets = tweetBank.list();
    io.sockets.emit('newTweet', { tweets: tweets });
    res.render('index', { tweets: allTheTweets, showForm: true });
  });

  router.get('/users/:name', function(req, res, next) {
    var tweetsForName = tweetBank.find(function(o) {
      return o.name === req.params.name;
    });
    res.render('index', { tweets: tweetsForName, name: req.params.name, showForm: true }); // {% for tweet in list %}
  });

  router.get('/tweets/:id', function(req, res, next) {
    var tweetsWithThatId = tweetBank.find(function(o) {
      return o.id === +req.params.id;
    });
    res.render('index', { tweets: tweetsWithThatId, showForm: false });
  });

  router.post('/tweets', function(req, res, next) {
    tweetBank.add(req.body.name, req.body.text); // form inputs get put in to the request body
    res.redirect('/'); // needs some sort of response
  });

  // parse application/x-www-form-urlencoded
  router.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  router.use(bodyParser.json());

  // router.get('../public/stylesheets', function(req, res) {
  //   res.sendFile('style.css');
  // });

  router.use(express.static('public'));
  // replaces router.get above
  // serves all of the files in /public to the pages that need them
  // instead of having to write res.sendFile() for every file
  // NO BACKSLASH OR ..

  return router;
};
