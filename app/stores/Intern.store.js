'use strict'

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
// var PayloadSources = AppConstants.PayloadSources;
var ActionTypes = AppConstants.ActionTypes;

var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _internData = {};

function _loadIntern(internData) {
  // TODO: Validate intern data here
  _internData = internData;
}

function _dropIntern() {
  _internData = {};
}

var InternStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) { this.on(CHANGE_EVENT, cb); },
  removeChangeListener: function(cb) { this.removeListener(CHANGE_EVENT, cb); },

  getInternData: function() { return _internData; }
});

InternStore.dispatcherToken = AppDispatcher.register(function(payload) {
  // var source = payload.source;
  var action = payload.action;

  switch(action.actionType) {
    case ActionTypes.INTERN_LOAD:
      _loadIntern(action.data);
      InternStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.INTERN_DROP:
      _dropIntern();
      InternStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = InternStore;
