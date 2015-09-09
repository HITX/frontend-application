'use strict'

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
// var PayloadSources = AppConstants.PayloadSources;
var ActionTypes = AppConstants.ActionTypes;

var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _projectData = {};

function _loadProject(projectData) {

  // TODO: Validate project data here

  _projectData = projectData;
}

function _dropProject() {
  _projectData = {};
}

var ProjectStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) { this.on(CHANGE_EVENT, cb); },
  removeChangeListener: function(cb) { this.removeListener(CHANGE_EVENT, cb); },

  getProjectData: function() { return _projectData; }
});

ProjectStore.dispatcherToken = AppDispatcher.register(function(payload) {
  // var source = payload.source;
  var action = payload.action;

  switch(action.actionType) {
    case ActionTypes.PROJECT_LOAD:
      _loadProject(action.data);
      ProjectStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.PROJECT_DROP:
      _dropProject();
      ProjectStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = ProjectStore;
