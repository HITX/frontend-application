'use strict'

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/AppConstants').ActionTypes;

var ProjectActions = {
  loadProject: function(projectData) {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.PROJECT_LOAD,
      data: projectData
    });
  },

  dropProject: function() {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.PROJECT_DROP
    });
  }
}

module.exports = ProjectActions;
