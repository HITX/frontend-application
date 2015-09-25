'use strict'

var React = require('react');
var Navigation = require('react-router').Navigation;
var classNames = require('classnames');

var DeadlineWidget = require('../Widgets/Deadline.comp.jsx');
var SubmissionCountWidget = require('../Widgets/SubmissionCount.comp.jsx');
var PrizeWidget = require('../Widgets/Prize.comp.jsx');

var NewsfeedItem = React.createClass({

  mixins: [Navigation],

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      hovered: false
    };
  },

  handleHover: function(hovered) {
    this.setState({
      hovered: hovered
    });
  },

  handleClick: function() {
    this.transitionTo('projects', {id: this.props.data.id});
  },

  render: function() {

    var testDesc = 'lakdjf lakdjf;lakdj lakdj ajjd alkdjf adlfja dlkj l jadlkfjad falkj';

    return (
      <div
        className='newsfeedItem'
        onMouseOver={this.handleHover.bind(this, true)}
        onMouseOut={this.handleHover.bind(this, false)}
        onClick={this.handleClick}>
        <div className='newsfeedItemLeft'>
          <img
            className='newsfeedItemLogo'
            src='/img/initec_logo.jpg'/>
          <br/>
          <PrizeWidget prize={this.props.data.prize}/>
        </div>
        <div className='newsfeedItemMiddle'>
          <p
            className={classNames('newsfeedItemTitle', {hovered: this.state.hovered})}>
            {this.props.data.title}
          </p>
          <p className='newsfeedItemOrgName'>{this.props.data.owner.org_name}</p>
          <p className='newsfeedItemDesc'>{testDesc}</p>
        </div>
        <div className='newsfeedItemRight'>
          <p>Tag 1</p>
          <p>Tag 2</p>
          <p>Tag 3</p>
        </div>
        <div className='newsfeedItemFooter'>
          <DeadlineWidget date={this.props.data.end_date}/>
          <SubmissionCountWidget count={this.props.data.submission_count}/>
        </div>
      </div>
    );
  }
});

module.exports = NewsfeedItem;
