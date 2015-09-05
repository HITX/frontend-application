'use strict'

var React = require('react');

var InternSubmissionsSidebarItem = require('./InternSubmissionsSidebarItem.comp.jsx');

var InternSubmissionsSidebar = React.createClass({

  propTypes: {
    submissions: React.PropTypes.array.isRequired
  },

  render: function() {
    return (
      <div id='internSubmissionsSidebar'>
        <div id='iSSHeader'>
          <p>My Projects</p>
          <p id='iSSHeaderArrow'>&rsaquo;</p>
        </div>
        <div id='iSSBody'>
          {
            this.props.submissions.map(function(item, idx, arr) {
              var lineBreak = (idx == arr.length - 1) ? {} : <hr/>
              return (
                <div key={item.id}>
                  <InternSubmissionsSidebarItem data={item}/>
                  {lineBreak}
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
});

module.exports = InternSubmissionsSidebar;
