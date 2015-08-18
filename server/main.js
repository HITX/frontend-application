'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var historyApiFallback = require('connect-history-api-fallback');
var login = require('./login.js');

var app = new express();

app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post('/api/login', login);
app.use(historyApiFallback());
app.use(express.static(__dirname + '/../public'));

app.listen(app.get('port'), function() {
  console.log('server listening on port ' + app.get('port'));
});
