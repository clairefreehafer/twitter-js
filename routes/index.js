module.exports = function(io) {

  const express = require('express');
  const router = express.Router();
  const bodyParser = require('body-parser');
  // or: const router = require('express').Router();
  // router entity is a box of routes, or a mini application
  // capable of only performing middleware and routing functions.
  // can replace app.VERB as router.VERB
  const tweetBank = require('../tweetBank');

  const jsonParser = bodyParser.json();
  const urlencodedParser = bodyParser.urlencoded({ extended: false });

  // parse application/x-www-form-urlencoded
  router.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  router.use(bodyParser.json());

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    res.redirect('/');
  });

  router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render( 'index', { tweets: tweets, showForm: true } );
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find(function(o) {
      return o.name === name;
    });
    res.render('index', { tweets: list, showForm: true, name: name }); // {% for tweet in list %}
  });

  router.get('/tweets/:id', function(req, res) {
    var id = +req.params.id;
    var tweet = tweetBank.find(function(o) {
      return o.id === id;
    });
    io.sockets.emit('newTweet', { tweets: tweet });
    res.render('index', { tweets: tweet, showForm: false });
  });

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
