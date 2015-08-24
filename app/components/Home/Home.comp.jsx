'use strict'

var React = require('react');

var Navigation = require('react-router').Navigation;

var SessionStore = require('../../stores/Session.store.js');

var Home = React.createClass({

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

  _onChange: function() {
    if (SessionStore.hasSession()) {
      this.setState({
        session: SessionStore.getSessionData()
      });
    } else {
      this.transitionTo('howitworks');
    }
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div id="home">
        <p>Home Page Under Construction</p>
      </div>
    );
  }
});

module.exports = Home;
