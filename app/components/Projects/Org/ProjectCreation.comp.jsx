'use strict'

var React = require('react');

var ProjectCreation = React.createClass({

  handleCreateClick: function() {
    console.log('Will create project here');
  },

  render: function() {
    return (
      <div id='projectCreation'>
        <table>
          <colgroup id='pCFirstCol' span='1'/>
          <colgroup id='pCSecondCol' span='1'/>
          <tr id='pCTitleRow'>
            <td>Title</td>
            <td><textarea/></td>
          </tr>
          <tr id='pCDescRow'>
            <td>Description</td>
            <td><textarea/></td>
          </tr>
          <tr id='pCDeadlineRow'>
            <td>Deadline</td>
            <td>Calendar Picker</td>
          </tr>
          <tr id='pCPrizeRow'>
            <td>Prize</td>
            <td>$<input type='text'/></td>
          </tr>
        </table>
        <button
          id='pCCreateButton'
          onClick={this.handleCreateClick}>
          Create
        </button>
      </div>
    );
  }
});

module.exports = ProjectCreation;
