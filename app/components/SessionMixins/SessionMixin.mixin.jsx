'use strict'

var SessionStore = require('../../stores/Session.store.js');

var SessionMixin = {
  getInitialState: function() {
    return {
      session: SessionStore.getSessionData()
    };
  },

  _onSessionChange: function() {
    this.setState({
      session: SessionStore.getSessionData()
    });
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onSessionChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onSessionChange);
  },

};

module.exports = SessionMixin;
