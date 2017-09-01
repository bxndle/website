var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var jwt = require('express-jwt');
var logger = require('morgan');
var passport = require('passport');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(favicon(path.join(__dirname, 'frontend', 'bundle-favicon.png')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend'), { redirect: false }));

require('./backend/db.js');
require('./backend/config/passport.js');
var routesApi = require('./backend/routes.js');

app.use(passport.initialize());
app.use('/api', routesApi);

app.get('/bower_components/*', function(req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile('/frontend/bower_components/', { root: __dirname });
});

app.all('/*', function(req, res) {
    // Just send the index.html for other files to support HTML5Mode
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile('/frontend/index.html', { root: __dirname });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.send();
});

module.exports = app;

app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
})
