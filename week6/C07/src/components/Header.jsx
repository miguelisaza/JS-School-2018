import React, { Component } from 'react';


class Header extends Component {

  state = {
    search: ''
  }

  handleSearch = (event) => {
    this.setState({ search: event.target.value })
    this.props.getSearch(event.target.value)
  }

  render() {
    return (
      <div className="header">
        <div id="logo">
          <img id="jobsity-logo" src={require('../img/jobsity.png')} alt="" align="centerS" />
        </div>
        <div className="text" id="title">Bookshelf</div>
        <div className="text search">
          <form method="get" id="search-bar" onChange={this.handleSearch}>
            <input name="q" type="text" size={40} placeholder="Search..." value={this.state.search} />
          </form>
        </div>
        <div className="text" id="login">
          <span id="username">Miguel Isaza</span>
          <span id="caron">ˇ</span>
          <img id="profile-ph" src={require('../img/user.png')} alt="" align="right" />
          <div id="userDrop" className="user-dropdown-content">
            <a href="#profile">Profile</a>
            <a href="#settigns">Settings</a>
            <a href="index.html">Sign Out</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
