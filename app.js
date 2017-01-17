const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const routes = require('./routes/');
const app = express(); // creates an instance of an express application

// allows you to set up a server:
app.listen(3000, function() {
  console.log('The server started.');
});

app.use(function(req, res, next) { // registers for every incoming request
  console.log('Request:', req.method, req.path, res.statusCode);
  next();
});

app.use('/special/', function(req, res, next) {
  res.send('you reached the special area');
  next();
});

app.use('/', routes);

app.set('view engine', 'html'); // have res.render work with html
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', { noCache: true });
// nunjucks.render('index.html', locals, function (err, output) {
//     console.log(output);
// });

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
