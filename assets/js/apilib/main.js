'use strict'

var Cookies = require('cookies-js');

var Config = require('../../../config/app/config.js');

var _buildUrl = function(path) {
  path = path.replace(/\/$|^\//g, '');
  path = path.replace()
  return 'http://' + Config.api.hostname + ':' + Config.api.port + '/' + path + '/';
};

var _statusIsSuccess = function(status) {
  return (status >= 200 && status <= 208) || status == 226;
}

var _handler = function(req, res, rej) {
  req.onload = function() {
    if (_statusIsSuccess(req.status)) {
      res({
        status: req.status,
        message: req.statusText,
        response: JSON.parse(req.response)
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
};

window.Internshyps = (function() {
  var authToken = Cookies.get('authToken');

  console.log("Auth token:");
  console.log(authToken);

  function _setAuth(token) {
    authToken = token;
    Cookies.set('authToken', token);
  }

  return {
    get: function(urlPath) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', _buildUrl(urlPath));
        if (authToken) {
          req.setRequestHeader('Authoriztion', 'Bearer ' + authToken);
        }
        _handler(req, resolve, reject);
        req.send();
      });
    },

    post: function(urlPath, data) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('POST', _buildUrl(urlPath));
        if (authtoken) {
          req.setRequestHeader('Authorization', 'Bearer ' + authToken);
        }
        req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        _handler(req, resolve, reject);
        req.send(JSON.stringify(data));
      });
    },

    // TODO: Allow user to set url path and connection headers
    // will have to somehow format data correctly (json/urlencoded/etc)
    login: function(username, password, url) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('POST', url);

        req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        // TODO:
        // if ('headers' in connectionObj) {
        //   for (var header in connectionOjb.headers) {
        //     req.setRequestHeader(header, connectionObj.headers);
        //   }
        // }

        req.onload = function() {
          if (_statusIsSuccess(req.status)) {
            var result = JSON.parse(req.response);
            // authToken = result.access_token;
            _setAuth(result.access_token);
            resolve({
              status: req.status,
              message: req.statusText,
              response: result
            });
          } else {
            reject({
              status: req.status,
              message: req.statusText
            });
          }
        };

        req.onerror = function() {
          reject({
            status: 0,
            message: 'Network Error'
          })
        };

        req.send(JSON.stringify({
          username: username,
          password: password
        }));
      });
    }
  }
})();
