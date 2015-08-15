'use strict';

var express = require('express');
var historyApiFallback = require('connect-history-api-fallback');
// var bodyParser = require('body-parser');
// var api = require('./util/api.js');

var app = new express();

app.set('port', process.env.PORT || 8080);
// app.use(bodyParser.json());
// app.use(api);
app.use(historyApiFallback());
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log('server listening on port ' + app.get('port'));
});
