'use strict';

// var http = require('http');
// var url = require('url');
//
// var server = http.createServer(function(request, response) {
//   var pathname = url.parse(request.url).pathname;
//
//   console.log('Request for ' + pathname + ' recieved');
//
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.write('Hello World!');
//   response.end();
// });
//
// server.listen(8080);
//
// console.log("Server running on port 8080");

require('node-jsx').install({
  harmony: true,
  extension: '.jsx'
});

var express = require('express');
// var historyApiFallback = require('connect-history-api-fallback');
// var bodyParser = require('body-parser');
// var api = require('./util/api.js');

var app = new express();

app.set('port', process.env.PORT || 8080);
// app.use(bodyParser.json());
// app.use(api);
// app.use(historyApiFallback);
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log('server listening on port ' + app.get('port'));
});
