'use strict'

var React = require('react');
var Navigation = require('react-router').Navigation;
var SessionStore = require('../../stores/Session.store.js');

// TODO: turn this into a factory that can allow only certain user types access

var SessionGuardMixin = {
  statics: {
    willTransitionTo: function(transition) {
      if (!SessionStore.hasSession()) {
        transition.redirect('howitworks');
      }
    }
  },

  mixins: [Navigation],

  getInitialState: function() {
    return {
      session: SessionStore.getSessionData()
    };
  },

  _onSessionChange: function() {
    if (SessionStore.hasSession()) {
      this.setState({
        session: SessionStore.getSessionData()
      });
    } else {
      this.transitionTo('howitworks');
    }
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onSessionChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onSessionChange);
  },

};

module.exports = SessionGuardMixin;
