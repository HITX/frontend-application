'use strict'

var React = require('react');

var Navigation = require('react-router').Navigation;

// var InternHome = require('./InternHome.comp.jsx');
// var OrgHome = require('./OrgHome.comp.jsx');
var InternSidebar = require('./InternSidebar.comp.jsx');
var OrgSidebar = require('./OrgSidebar.comp.jsx');
var Newsfeed = require('../Newsfeed/Newsfeed.comp.jsx');
var Error = require('../Error/Error.comp.jsx');

var UserTypes = require('../../constants/AppConstants.js').UserTypes;

var SessionStore = require('../../stores/Session.store.js');

var SessionGuardMixin = require('../SessionMixins/SessionGuardMixin.mixin.jsx');

var Home = React.createClass({

  mixins: [SessionGuardMixin],

  render: function() {
    var sidebar;
    switch(this.state.session.user_type) {
      case UserTypes.INTERN:
        sidebar = <InternSidebar submissions={this.state.session.submissions}/>;
        break;
      case UserTypes.ORG:
        sidebar = <OrgSidebar projects={this.state.session.projects}/>;
        break;
      default:
        sidebar = <Error message={'Unknown user type'}/>;
    }

    return (
      <div id="home">
        <div id='itemList'>
          <Newsfeed/>
        </div>
        <div id='sidebar'>
          {sidebar}
        </div>
      </div>
    );
  }
});

module.exports = Home;
