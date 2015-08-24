'use strict'

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
// var PayloadSources = AppConstants.PayloadSources;
var ActionTypes = AppConstants.ActionTypes;

var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _hasSession = false;
var _sessionData = {};

function _loadSession(sessionData) {

  // TODO: Validate session data here

  _hasSession = true;
  _sessionData = sessionData;
}

function _dropSession() {
  _hasSession = false;
  _sessionData = {};
}

var SessionStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  hasSession: function() {
    return _hasSession;
  },

  getSessionData: function() {
    return _sessionData;
  }
});

SessionStore.dispatcherToken = AppDispatcher.register(function(payload) {
  // var source = payload.source;
  var action = payload.action;

  switch(action.actionType) {
    case ActionTypes.SESSION_LOAD:
      _loadSession(action.data);
      SessionStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.SESSION_DROP:
      _dropSession();
      SessionStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = SessionStore;
