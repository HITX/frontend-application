'use strict'

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/AppConstants').ActionTypes;

var InternActions = {
  loadIntern: function(internData) {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.INTERN_LOAD,
      data: internData
    });
  },

  dropIntern: function() {
    AppDispatcher.handleClientAction({
      actionType: ActionTypes.INTERN_DROP
    });
  }
}

module.exports = InternActions;
