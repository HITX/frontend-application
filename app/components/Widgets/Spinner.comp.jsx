'use strict'

var React = require('react');

var SpinnerWidget = React.createClass({

  propTypes: {
    delayMs: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      delayMs: null
    };
  },

  getInitialState: function() {
    return {
      show: true
    };
  },

  componentDidMount: function() {
    var delay = this.props.delayMs;
    if (delay != null && delay > 0) {
      this.setState({show: false});

      setTimeout(function() {
        if (this.isMounted()) {
          this.setState({show: true});
        }
      }.bind(this), delay);
    }
  },

  render: function() {
    if (!this.state.show) {
      return null;
    }

    return (
      <div className='spinnerWidget'>
        <img src='/img/spinner.svg'/>
      </div>
    );
  }
});

module.exports = SpinnerWidget;
