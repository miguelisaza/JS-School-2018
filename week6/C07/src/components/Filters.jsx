import React, { Component } from 'react';


class Filters extends Component {

  state = {
    activeFilter: ''
  }

  handleClick = (filter) => this.setState({ activeFilter: filter })

  render() {
    return (
      <div className="sidebar filters">
        <div className="book-filters">
          <h4 className="sidebar-section">MAIN</h4>
          <ul className="icon-list" id="il">
            <ClickableFilter isActive={this.state.activeFilter === 'Quito'} setToActive={this.handleClick} getLocation={this.props.getLocation} locationName={'Quito'} faIcon='fa fa-map-marker' />
            <ClickableFilter isActive={this.state.activeFilter === 'Cartagena'} setToActive={this.handleClick} getLocation={this.props.getLocation} locationName={'Cartagena'} faIcon='fa fa-map-marker' />
            <ClickableFilter isActive={this.state.activeFilter === 'Medellin'} setToActive={this.handleClick} getLocation={this.props.getLocation} locationName={'Medellin'} faIcon='fa fa-map-marker' />
            <ClickableFilter isActive={this.state.activeFilter === 'Digital'} setToActive={this.handleClick} getLocation={this.props.getLocation} locationName={'Digital'} faIcon='fa fa-tablet' />
            <ClickableFilter isActive={this.state.activeFilter === 'Personal Loans'} setToActive={this.handleClick} getLocation={this.props.getLocation} locationName={'Personal Loans'} faIcon='fa fa-user' />
            <ClickableFilter isActive={this.state.activeFilter === 'New Releases'} setToActive={this.handleClick} getLocation={this.props.getLocation} locationName={'New Releases'} faIcon='fa fa-tags' />
          </ul>
        </div>
        <div className="my-books">
          <h4 className="sidebar-section">YOUR BOOKS</h4>
          <ul className="icon-list">
            <li>
              <i className="fa fa-book" />Readings</li>
            <li>
              <i className="fa fa-history" />History</li>
            <li>
              <i className="fa fa-bookmark" />Read Later</li>
            <li>
              <i className="fa fa-heart" />Favorites</li>
          </ul>
        </div>
      </div>
    )
  }
}

class ClickableFilter extends Component {

  state = {
    filter: ''
  }

  selectFilter = (event) => {
    this.setState({ filter: event.target.id });
    this.props.getLocation(event.target.id);
    this.props.setToActive(this.props.locationName);
  }

  deactivate = () => {
    this.props.getLocation('');
    this.props.setToActive('');
  };

  render() {
    return (
      <li id={this.props.locationName} onClick={this.selectFilter} onDoubleClick={this.deactivate} className={this.props.isActive ? 'selected' : ''} >
        <i className={this.props.faIcon} />{this.props.locationName} </li>
    )
  }
}

export default Filters; 