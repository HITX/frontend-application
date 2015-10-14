'use strict'

// TODO: Add this polyfill - https://github.com/paulirish/matchMedia.js

var MEDIABREAK1 = '40rem';
var MEDIABREAK2 = '55rem';

var _break1 = window.matchMedia('(max-width: ' + MEDIABREAK1 + ')');
var _break2 = window.matchMedia('(max-width: ' + MEDIABREAK2 + ')');

var MediaMixin = {
  getInitialState: function() {
    return {
      media: {
        break1: _break1.matches,
        break2: _break2.matches
      }
    };
  },

  _onMediaEvent: function(name, mediaQuery) {
    if (this.isMounted()) {
      var newMediaState = this.state.media;
      newMediaState[name] = mediaQuery.matches;
      this.setState({media: newMediaState});
    }
  },

  componentDidMount: function() {
    this.break1Listener = this._onMediaEvent.bind(this, 'break1');
    this.break2Listener = this._onMediaEvent.bind(this, 'break2');

    _break1.addListener(this.break1Listener);
    _break2.addListener(this.break2Listener);
  },

  componentWillUnmount: function() {
    _break1.removeListener(this.break1Listener);
    _break2.removeListener(this.break2Listener);
  }
}

module.exports = MediaMixin;
