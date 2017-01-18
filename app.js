const express = require('express');
const morgan = require('morgan'); // makes logging easier
const nunjucks = require('nunjucks'); // allows us to use {{variable}} in HTML file
const routes = require('./routes'); // looking for index.js file in that folder
const socketio = require('socket.io');
const app = express(); // creates an instance of an express application
/* from video:
var fs = require('fs'); // access local files
var path = require('path');
var mine = require('mime');
var bodyParser = require('body-parser');
*/

// the following is boilerplate
app.set('view engine', 'html'); // what file extension our templates have
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', { noCache: true }); // tell nj what folder index.html lives in
/*
nunjucks.render('index.html', locals, function (err, output) {
  console.log(output);
});
*/

app.use(morgan('dev')); // morgan dev is the logger
/* replaces:
app.use(function(req, res, next) { // registers for every incoming request, '/' is default
  console.log('Request:', req.method, req.path, res.statusCode);
  next(); // functions after it aren't waiting for asynchronous task to finish'
});
*/

// what does this replace?
/* from video
// manually-written static file middleware:
app.use(function(req, res, next) {
  var mimeType = mime.lookup(req.path); // look at file extension and figure out header
  fs.readFile('./public' + req.path, function(err, fileBuffer) {
    if (err) return next(0);
    res.header('Content-Type', mimeType);
    res.send(fileBuffer);
  });
})

// alternative - typical way to use express static middleware:
var staticMiddleware = app.use(express.static(__dirname + '/public'));
app.use(staticMiddleware);
*/

app.use('/', routes(io)); // defaults to '/'

/* from video: ( we put it in index.js)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // AJAX requests
*/


app.use('/special', function(req, res, next) {
  res.send('you reached the special area');
  next();
});

// allows you to set up a server:
var server = app.listen(3000, function() {
  console.log('The server started.');
});
var io = socketio.listen(server);

// ========================================================

/* lecture:
var articles = ['A', 'B', 'C'];

// order matters for app.use()
app.use('/', function(req, res, next) { // .use ()runs myLoggingMiddleware on any route that matches '/'
  console.log('Request:', req.method, req.path);
  next();
});

app.get('/', function(req, res, next) { // .get() match get request to '/' and only '/'
  res.send('enough');
});

app.get('/articles', function(req, res, next) {
  res.json(articles);
});

app.get('/unknown', function(req, res, next) {
  next({ status: 403, msg: 'dunno' });
});

app.use(function(err, req, res, next) {
  console.error(err.msg);
  res.sendStatus(err.status);
});
*/
