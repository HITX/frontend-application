'use strict'

var React = require('react');

var State = require('react-router').State;
var Navigation = require('react-router').Navigation;

var classNames = require('classnames');

var LoginMixin = require('../LoginMixin/LoginMixin.mixin.jsx');
var SignupMixin = require('../SignupMixin/SignupMixin.mixin.jsx');
var MediaMixin = require('../MediaMixin/MediaMixin.mixin.jsx');

var HeaderSlideout = require('./HeaderSlideout.comp.jsx');

var SessionStore = require('../../stores/Session.store.js');
var SessionActions = require('../../actions/Session.actions.js');

var HeaderLinks = React.createClass({

  mixins: [Navigation, State, LoginMixin, SignupMixin, MediaMixin],

  getInitialState: function() {
    return {
      hasSession: SessionStore.hasSession(),
      showSlideout: false
    };
  },

  _onChange: function() {
    this.setState({
      hasSession: SessionStore.hasSession()
    });
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  handleIconClick: function() {
    this.setState({showSlideout: true});
  },

  handleSlideoutClose: function() {
    this.setState({showSlideout: false});
  },

  handleLoginClick: function() {
    this.openLogin();
    if (this.isMounted()) {
      this.setState({showSlideout: false});
    }
  },

  handleLogoutClick: function() {
    Internshyps.logout();
    SessionActions.dropSession();
    if (this.isMounted()) {
      this.setState({showSlideout: false});
    }
  },

  handleNavClick: function(dest) {
    var params = null;

    if (dest == 'profile') {
      if (!this.state.hasSession) {return;}
      dest = SessionStore.isIntern() ? 'interns' : 'orgs';
      params = {id: SessionStore.getSessionData().id};
    }

    this.transitionTo(dest, params);

    if (this.isMounted()) {
      this.setState({showSlideout: false});
    }
  },

  testActive: function(routeName) {
    return this.isActive(routeName, this.props.params, this.props.query);
  },

  render: function() {
    var links = [
      {
        name: 'Home',
        handler: this.handleNavClick.bind(this, 'home'),
        active: this.testActive('home')
      },
      {
        name: 'About',
        handler: this.handleNavClick.bind(this, 'howitworks'),
        active: this.testActive('howitworks')
      },
      {
        name: 'Profile',
        handler: this.handleNavClick.bind(this, 'profile'),
        active: this.testActive('profile')
      }
    ];

    if (this.state.hasSession) {
      links.push({name: 'Log out', handler: this.handleLogoutClick, active: false});
    } else {
      links.push({name: 'Log in', handler: this.handleLoginClick, active: false});
    }

    if (this.state.media.break1) {
      return (
        <div id='headerLinks'>
          {this.loginModal(this.openSignup)}
          {this.signupModal(this.openLogin)}
          <img
            id='headerLinksIcon'
            src='/img/bars_icon_white.svg'
            onClick={this.handleIconClick}
          />
        <HeaderSlideout
          visible={this.state.showSlideout}
          links={links}
          onClose={this.handleSlideoutClose}
          />
        </div>
      );
    }

    return (
      <div id='headerLinks'>
        {this.loginModal(this.openSignup)}
        {this.signupModal(this.openLogin)}
        {
          links.map(function(item, idx) {
            return (
              <p
                key={idx}
                className={classNames('headerLink', {active: item.active})}
                onClick={item.handler}
                >
                {item.name}
              </p>
            );
          })
        }
      </div>
    );
  }
});

module.exports = HeaderLinks;
