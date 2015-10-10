'use strict'

var Cookies = require('cookies-js');

var ApiConfig = require('../../../config/app/config.js').api;

// var _buildUrl = function(path, query_params = null) {
function _buildUrl(path, query_params) {
  path = path.replace(/\/$|^\//g, '');
  // path = path.replace()
  var url = 'http://' + ApiConfig.hostname + ':' + ApiConfig.port + '/' + path + '/';
  if (query_params) {
    var isFirst = true;
    for (var param in query_params) {
      url += isFirst ? '?' : '&';
      url += param + '=' + query_params[param];
      isFirst = false;
    }
  }
  return url;
}

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
        message: req.statusText,
        response: JSON.parse(req.response)
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

  function _setAuth(token) {
    authToken = token;
    Cookies.set('authToken', token);
  }

  return {
    hasToken: function() { return !!authToken; },

    get: function(urlPath, params) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', _buildUrl(urlPath, params));
        if (authToken) {
          req.setRequestHeader('Authorization', 'Bearer ' + authToken);
        }
        _handler(req, resolve, reject);
        req.send();
      });
    },

    getFile: function(url) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
          if (_statusIsSuccess(req.status)) {
            resolve({
              status: req.status,
              message: req.statusText,
              response: req.response
            });
          } else {
            reject({
              status: req.status,
              message: req.statusText,
              response: req.response
            });
          }
        }

        req.onerror = function() {
          reject({
            status: 0,
            message: 'Network Error'
          });
        }
        req.send();
      });
    },

    post: function(urlPath, data, params) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('POST', _buildUrl(urlPath, params));
        if (authToken) {
          req.setRequestHeader('Authorization', 'Bearer ' + authToken);
        }
        req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        _handler(req, resolve, reject);
        req.send(JSON.stringify(data));
      });
    },

    postFormData: function(urlPath, data, params) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('POST', _buildUrl(urlPath, params));
        if (authToken) {
          req.setRequestHeader('Authorization', 'Bearer ' + authToken);
        }
        _handler(req, resolve, reject);
        var formData = new FormData();
        for (var key in data) {
          formData.append(key, data[key]);
        }
        req.send(formData);
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
    },

    logout: function() {
      authToken = undefined;
      Cookies.expire('authToken');
    }
  }
})();
