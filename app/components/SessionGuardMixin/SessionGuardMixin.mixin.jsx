'use strict'

var React = require('react');
var Navigation = require('react-router').Navigation;
var SessionMixin = require('./SessionMixin.comp.jsx');
var SessionStore = require('../../stores/Session.store.js');

var SessionGuardMixin = {
  statics: {
    willTransitionTo: function(transition) {
      if (!SessionStore.hasSession()) {
        transition.redirect('howitworks');
      }
    }
  },

  mixins: [SessionMixin, Navigation],

  _onSessionChange: function() {
    if (SessionStore.hasSession()) {
      this.setState({
        session: SessionStore.getSessionData()
      });
    } else {
      this.transitionTo('howitworks');
    }
  },
};

module.exports = SessionGuardMixin;
