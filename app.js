const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/places', express.static(path.join(__dirname, 'public')));
app.use('/places/css', express.static(path.join(__dirname,'node_modules/@fortawesome/fontawesome-free/css')));
app.use('/places/css', express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')));
app.use('/places/js', express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')));
app.use('/places/js', express.static(path.join(__dirname,'node_modules/jquery/dist')));
app.use('/places/webfonts', express.static(path.join(__dirname,'node_modules/@fortawesome/fontawesome-free/webfonts')));

app.use('/places', indexRouter);
app.get('/', (req, res) => {
  res.redirect('/places');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
