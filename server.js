var http = require('http');
var url = require('url');

var server = http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname;

  console.log('Request for ' + pathname + ' recieved');

  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Hello World!');
  response.end();
});

server.listen(8080);

console.log("Server running on port 8080");
