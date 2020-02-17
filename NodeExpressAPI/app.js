/*
* type "npm start" to start server
*/

'use strict';
var express = require('express');
var app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug');
// var logger = require('morgan');
// var favicon = require('serve-favicon');

var generateUID = require('./routes/generateUID');
var customer = require('./routes/customer');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set to save data in cookies
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

/* CORS setup
   * setup cors before connecting API's
*/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/generateUID', generateUID);   // http://localhost:3000/api/generateUID
app.use('/api/customer', customer);         // http://localhost:3000/api/customer

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

module.exports = app;