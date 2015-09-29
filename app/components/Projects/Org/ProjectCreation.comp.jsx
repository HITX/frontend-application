'use strict'

var React = require('react');

var Navigation = require('react-router').Navigation;
var SessionGuardMixin = require('../../SessionMixins/SessionGuardMixin.mixin.jsx');
var InputMixinFactory = require('../../InputMixinFactory/InputMixinFactory.mixin.jsx');

var INPUTS = {
  title: {display_name: null, textarea: true},
  description: {display_name: null, textarea: true},
  prize: {display_name: null}
};
var INPUT_CONSTRAINTS = {
  title: {presence: true},
  description: {presence: true},
  prize: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThan: 0
    }
  }
};
var InputMixin = InputMixinFactory(INPUTS, INPUT_CONSTRAINTS);

var ProjectCreation = React.createClass({

  mixins: [SessionGuardMixin, InputMixin],

  handleCreateClick: function() {
    if (this.validateInputs()) {
      Internshyps.post('projects', this.getAllInputData()).then(
        function(result) {
          this.transitionTo('home');
        }.bind(this),
        function(err) {
          console.log('Project creation server error:');
          console.log(err.response);
        }
      );
    }
  },

  render: function() {
    return (
      <div id='projectCreation'>
        <table>
          <colgroup id='pCFirstCol' span='1'/>
          <colgroup id='pCSecondCol' span='1'/>
          <tr id='pCTitleRow'>
            <td>Title</td>
            <td>{this.generateInput('title')}</td>
          </tr>
          <tr id='pCDescRow'>
            <td>Description</td>
            <td>{this.generateInput('description')}</td>
          </tr>
          <tr id='pCDeadlineRow'>
            <td>Deadline</td>
            <td>Calendar Picker</td>
          </tr>
          <tr id='pCPrizeRow'>
            <td>Prize</td>
            <td>${this.generateInput('prize')}</td>
          </tr>
        </table>
        <p>{this.popError()}</p>
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
