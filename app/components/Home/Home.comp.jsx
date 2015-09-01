'use strict'

var React = require('react');

var Navigation = require('react-router').Navigation;

var InternHome = require('./InternHome.comp.jsx');
var OrgHome = require('./OrgHome.comp.jsx');
var Error = require('../Error/Error.comp.jsx');

var UserTypes = require('../../constants/AppConstants.js').UserTypes;

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
    var homeComp;
    switch(this.state.session.user_type) {
      case UserTypes.INTERN:
        homeComp = <InternHome session={this.state.session}/>;
        break;
      case UserTypes.ORG:
        homeComp = <OrgHome session={this.state.session}/>;
        break;
      default:
        homeComp = <Error message={'Unknown user type'}/>;
    }

    return (
      <div id="home">
        {homeComp}
      </div>
    );
  }
});

module.exports = Home;
