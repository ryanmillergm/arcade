var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var gamesRouter = require('./routes/api/v1/games');
var storesRouter = require('./routes/api/v1/stores');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/games', gamesRouter);
app.use('/api/v1/stores', storesRouter);

module.exports = app;
