'use strict'

var React = require('react');

var validate = require('validate.js');

function InputMixinFactory(inputs, constraints) {
  return {

    getInitialState: function() {
      var initial = {
        _inputs: {},
        _inputErrors: {}
      }

      return Object.keys(inputs).reduce(function(prev, cur) {
        prev._inputs[cur] = '';
        return prev;
      }, initial);
    },

    handleInputChange: function(event) {
      var newState = {
        _inputs: this.state._inputs,
        _inputErrors: this.state._inputErrors
      };

      newState._inputs[event.target.id] = event.target.value;
      delete newState._inputErrors[event.target.id]

      this.setState(newState);
    },

    generateInput: function(name) {
      var input = inputs[name];

      var elType = 'input';
      if (input.hasOwnProperty('textarea') && input.textarea) {
        elType = 'textarea';
      }

      var props = {
        id: name,
        placeholder: input.hasOwnProperty('display_name') ? input.display_name : name,
        value: this.state._inputs[name],
        onChange: this.handleInputChange
      }
      if (elType == 'input') {
        props.type = input.hasOwnProperty('type') ? input.type : 'text';
      }
      if (this.state._inputErrors.hasOwnProperty(name)) {
        props.className = 'invalid';
      }

      return React.createElement(elType, props, null);
    },

    generateAllInputs: function() {
      return Object.keys(inputs).map(function(name) {
        return this.generateInput(name);
      }.bind(this));
    },

    getInputData: function(name) {
      return this.state._inputs[name];
    },

    getAllInputData: function() {
      return this.state._inputs;
    },

    validateInputs: function() {
      var newErrors = validate(this.getAllInputData(), constraints);
      if (newErrors) {
        this.setState({_inputErrors: newErrors});
        return false;
      }
      return true;
    },

    popError: function() {
      var errArray = Object.keys(this.state._inputErrors);
      if (errArray.length == 0) {
        return null;
      }
      return this.state._inputErrors[errArray[0]];
    }
  };
}

module.exports = InputMixinFactory;
