var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');

var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');
var aboutRouter = require('./routes/about');
var createRouter = require('./routes/create');
var writingRouter = require('./routes/writing');

var app = express();

app.use(session({
  secret: 'webslesson',
  resave: true,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/article', newsRouter);
app.use('/about', aboutRouter);
app.use('/create', createRouter);
app.use('/writing', writingRouter);

// catch 404 and forward to error handler
app.use(function (request, response, next) {
  next(createError(404));
});

// error handler
app.use(function (error, requset, response, next) {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = requset.app.get('env') === 'development' ? error : {};

  // render the error page
  response.status(error.status || 500);
  response.render('error');
});

module.exports = app;
