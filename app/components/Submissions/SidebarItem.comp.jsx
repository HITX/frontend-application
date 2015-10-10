'use strict'

var React = require('react');

var classNames = require('classnames');

var SubmissionActions = require('../../actions/Submission.actions.js');

var SidebarItem = React.createClass({

  getDefaultProps: function() {
    return {selected: false};
  },

  propTypes: {
    selected: React.PropTypes.bool,
    file: React.PropTypes.object.isRequired
  },

  handleClick: function() {
    SubmissionActions.updateCurrentFile(this.props.file);
  },

  render: function() {
    var data = this.props.file;
    console.log(data);

    return (
      <div
        className='sidebarItem'
        className={classNames('sidebarItem', {selected: this.props.selected})}
        onClick={this.handleClick}>
        <p className='sidebarItemArrow'>&lsaquo;</p>
        <p className='sidebarItemTitle'>{data.filename}</p>
      </div>
    );
  }
});

module.exports = SidebarItem;
