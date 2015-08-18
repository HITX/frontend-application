'use strict'

var Config = require('./config.js');

var _buildUrl = function(path) {
  path = path.replace(/\/$|^\//g, '');
  path = path.replace()
  return 'http://' + Config.host + '/' + path + '/';
}

var _handleReq = function(req, res, rej) {
  req.onload = function() {
    if ((req.status >= 200 && req.status <= 208)
        || req.status == 226) {
      res({
        status: req.status,
        message: req.statusText,
        response: req.response
      });
    } else {
      rej({
        status: req.status,
        message: req.statusText
      });
    }
  }

  req.onerror = function() {
    rej({
      status: 0,
      message: 'Network Error'
    });
  }
}

window.Internshyps = (function() {
  var authToken = null;

  var lib = {
    get: function(urlPath) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', _buildUrl(urlPath));
        _handleReq(req, resolve, reject);
        req.send();
      });
    },

    post: function(urlPath, data) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('POST', _buildUrl(urlPath));
        req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        _handleReq(req, resolve, reject);
        req.send(JSON.stringify(data));
      });
    }
  }

  return lib;
})();
