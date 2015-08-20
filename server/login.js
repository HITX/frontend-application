'use strict'

var querystring = require('querystring');
var http = require('http');
var Config = require('./config.js');

var app_auth = Config.oauth.client_id +
               ':' +
               Config.oauth.client_secret;

function login(clientReq, clientResp) {

  // TODO: validate username and password

  var postData = querystring.stringify({
    grant_type: 'password',
    username: clientReq.body.username,
    password: clientReq.body.password
  });

  var options = {
    hostname: SharedConfig.api.hostname,
    port: Config.shared.api.port,
    path: '/o/token/',
    auth: app_auth,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Content-Length': postData.length
    }
  };

  var req = http.request(options, function(resp) {
    var body = '';
    resp.setEncoding('utf8');

    resp.on('data', function (chunk) {
      body += chunk;
    });

    resp.on('end', function() {
      clientResp.status(resp.statusCode);
      clientResp.json(JSON.parse(body));
    })
  });

  req.on('error', function(err) {
    clientResp.status(500);
    clientResp.json({error: err.message});
  });

  req.write(postData);
  req.end();
}

module.exports = login;
