'use strict'

var React = require('react');

var FileViewer = React.createClass({

  propTypes: {
    file: React.PropTypes.object,
  },

  getInitialState: function() {
    return {
      content_loading: false,
      content: null
    };
  },

  _fetchFileContents: function() {
    this.setState({
      content_loading: true,
      content: null
    });

    Internshyps.getFile(this.props.file.url).then(
      function(result) {
        if (this.isMounted()) {
          this.setState({
            content_loading: false,
            content: result.response
          });
        }
      }.bind(this),
      function(err) {
        console.log('Error retreiving file');
        console.log(err.response);
      }
    );
  },

  componentDidMount: function() {
    if (this.props.file) {
      this._fetchFileContents();
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.file) {
      if (!prevProps.file || this.props.file.url != prevProps.file.url) {
        this._fetchFileContents();
      }
    }
  },

  _renderContentHelper: function() {
    if (this.state.content) {
      return <pre>{this.state.content}</pre>
    }

    if (this.state.content_loading) {
      return <p>Loading...</p>
    }

    return <p>No content to display</p>
  },

  render: function() {
    var filename = 'No file selected';
    if (this.props.file) {
      filename = this.props.file.filename;
    }

    return (
      <div id='submissionsViewer'>
        <div id='viewerHeader'>
          <p>{filename}</p>
        </div>
        <div id='viewerBody'>
          {this._renderContentHelper()}
        </div>
        <div id='viewerFooter'>
          <button>Delete</button>
        </div>
      </div>
    );
  }
});

module.exports = FileViewer;
