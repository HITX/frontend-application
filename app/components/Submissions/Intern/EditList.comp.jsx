'use strict'

var React = require('react');

var SessionGuardMixin = require('../../SessionMixins/SessionMixin.mixin.jsx');

var EditList = React.createClass({

  mixins: [SessionGuardMixin],

  render: function() {
    return (
      <div id='internSubmissionsEditList'>
        <div id='iSELMain'>
          
        </div>
        <div id='iSELSidebar'>
        </div>
        <p>Intern submissions edit list</p>
      </div>
    );
  }
});

module.exports = EditList;
