'use strict'

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/AppConstants').ActionTypes;

var OrgActions = {
  loadOrg: function(orgData) {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.ORG_LOAD,
      data: orgData
    });
  },

  dropOrg: function() {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.ORG_DROP
    });
  }
}

module.exports = OrgActions;
