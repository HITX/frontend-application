'use strict'

var React = require('react');

var Navigation = require('react-router').Navigation;

var InternHome = require('./InternHome.comp.jsx');
var OrgHome = require('./OrgHome.comp.jsx');
var Error = require('../Error/Error.comp.jsx');

var UserTypes = require('../../constants/AppConstants.js').UserTypes;

var SessionStore = require('../../stores/Session.store.js');

var SessionGuardMixin = require('../SessionMixins/SessionGuardMixin.mixin.jsx');

var Home = React.createClass({

  mixins: [SessionGuardMixin],

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
