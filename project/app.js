var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expHbs = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var settings = require('./config/settings');

var app = express();

// view engine setup
var hbsConfig = expHbs.create({
	helpers: require('./helpers/handlebars.js').helpers,
	layoutsDir: path.join(__dirname, '/templates/'+ settings.defaultTemplate +'/layouts'),
	defaultLayout: path.join(__dirname, '/templates' + settings.defaultLayout + '/layouts/layout'),
	partialsDir: path.join(__dirname, '/templates' + settings.defaultLayout + '/patials'),
	extname: '.hbs'
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
