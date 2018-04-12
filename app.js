let express = require('express');
let path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

let config = require('config');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let sassMiddleware = require('node-sass-middleware');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? {} : err;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.warn('Server started');
console.warn(`###app  MONGO_URI=${config.get('MONGO_URI')}###\n###NODE_ENV=${process.env.NODE_ENV}###`);
module.exports = app;
