'use strict'

var Config = require('./config.js');

window.internshyps = (function() {
  var authToken = null;

  var lib = {
    get: function(url) {

      

      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
          if (req.status == 200) {
            resolve(req.response);
          } else {
            reject(Error(req.statusText));
          }
        };

        req.onerror = function() {
          reject(Error('Network Error'));
        };

        req.send();
      });
    },
  }

  return lib;
})();
