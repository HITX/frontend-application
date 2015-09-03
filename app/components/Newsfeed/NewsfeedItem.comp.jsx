'use strict'

var React = require('react');
var Navigation = require('react-router').Navigation;
var classNames = require('classnames');

var NewsfeedItem = React.createClass({

  mixins: [Navigation],

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      baseHovered: false,
      orgHovered: false
    };
  },

  handleBaseHover: function(hovered) {
    this.setState({
      baseHovered: hovered
    });
  },

  handleOrgHover: function(hovered) {
    this.setState({
      orgHovered: hovered
    });
  },

  handleBaseClick: function() {
    this.transitionTo('projects', {id: this.props.data.id});
  },

  handleOrgClick: function(event) {
    this.transitionTo('orgs', {id: this.props.data.owner.id});
    event.stopPropagation();
  },

  render: function() {
    return (
      <div
        className={classNames('newsfeedItem', {highlight: this.state.baseHovered})}
        onClick={this.handleBaseClick}
        onMouseEnter={this.handleBaseHover.bind(this, true)}
        onMouseLeave={this.handleBaseHover.bind(this, false)}>
        <div className='newsfeedItemTop'>
          <img
            className='newsfeedItemLogo'
            src='/img/initec_logo.jpg'
            onClick={this.handleOrgClick}
            onMouseEnter={this.handleOrgHover.bind(this, true)}
            onMouseLeave={this.handleOrgHover.bind(this, false)}/>
          <p
            className={classNames('newsfeedItemOrgName', {highlight: this.state.orgHovered})}
            onClick={this.handleOrgClick}
            onMouseEnter={this.handleOrgHover.bind(this, true)}
            onMouseLeave={this.handleOrgHover.bind(this, false)}>
              {this.props.data.owner.org_name}
          </p>
        </div>
        <div className='newsfeedItemMiddle'>
          <div className='newsfeedItemTitleBlock'>
            <p className='newsfeedItemTitle'>{this.props.data.title}</p>
            <p className='newsfeedItemPrize'>${Math.round(this.props.data.prize)}</p>
          </div>
          <p className='newsfeedItemDesc'>{this.props.data.description}</p>
        </div>
        <hr/>
        <div className='newsfeedItemBottom'>
          <div className='newsfeedItemSubmissionsBlock'>
            <p className='newsfeedItemSubmissionsText'>Submissions: &nbsp;</p>
            <p className='newsfeedItemSubmissionsVal'>{this.props.data.submission_count}</p>
          </div>
          <div className='newsfeedItemDeadlineBlock'>
            <p className='newsfeedItemDeadlineText'>Deadline: &nbsp;</p>
              <p className='newsfeedItemDeadlineVal'>{this.props.data.end_date}</p>
          </div>
        </div>
      </div>
    );
  }

  // render: function() {
  //   return (
  //     <div className='newsfeedItem'>
  //       <p className='newsfeedItemTitle'>{this.props.data.title}</p>
  //       <p className='newsfeedItemDesc'>{this.props.data.description}</p>
  //       <button className='newsfeedItemButton' onClick={this.handleClick}>&rsaquo;</button>
  //     </div>
  //   );
  // }
});

module.exports = NewsfeedItem;
