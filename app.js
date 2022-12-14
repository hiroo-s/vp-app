var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var vpRouter = require('./routes/vp');
var verifyRouter = require('./routes/verify');
var chkRouter = require('./routes/chk');
var restrictedRouter = require('./routes/restricted');
var logoutRouter = require('./routes/logout');
var debugRouter = require('./routes/debug');
var newRouter = require('./routes/new');
var vcRouter = require('./routes/vc');
var manifestRouter = require('./routes/manifest');
var issueRouter = require('./routes/issue');
var completeRouter = require('./routes/complete');
var didRouter = require('./routes/did');

var app = express();

app.locals.verified = {};
app.locals.request = {};
app.locals.count = 0;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vp', vpRouter);
app.use('/verify', verifyRouter);
app.use('/chk', chkRouter);
app.use('/restricted', restrictedRouter);
app.use('/logout', logoutRouter);
app.use('/debug', debugRouter);
app.use('/new', newRouter);
app.use('/vc', vcRouter);
app.use('/manifest', manifestRouter);
app.use('/issue', issueRouter);
app.use('/complete', completeRouter);
app.use('/.well-known', didRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
