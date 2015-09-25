'use strict'

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
// var PayloadSources = AppConstants.PayloadSources;
var ActionTypes = AppConstants.ActionTypes;

var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _orgData = {};

function _loadOrg(orgData) {
  // TODO: Validate org data here
  _orgData = orgData;
}

function _dropOrg() {
  _orgData = {};
}

var OrgStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) { this.on(CHANGE_EVENT, cb); },
  removeChangeListener: function(cb) { this.removeListener(CHANGE_EVENT, cb); },

  getOrgData: function() { return _orgData; }
});

OrgStore.dispatcherToken = AppDispatcher.register(function(payload) {
  // var source = payload.source;
  var action = payload.action;

  switch(action.actionType) {
    case ActionTypes.ORG_LOAD:
      _loadOrg(action.data);
      OrgStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.ORG_DROP:
      _dropOrg();
      OrgStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = OrgStore;
