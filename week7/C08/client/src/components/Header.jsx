import React, { Component } from "react";
import PropTypes from "prop-types";
import HeaderDropdownMenu from "./HeaderDropdownMenu";
import { eraseToken } from "../config/session";

class Header extends Component {
  static propTypes = {
    getSearch: PropTypes.func,
    user: PropTypes.object
  };

  static defaultProps = {
    getSearch: () => {},
    user: {}
  };

  state = {
    search: "",
    dropDown: false
  };

  handleSearch = event => {
    const { getSearch } = this.props;

    this.setState({ search: event.target.value });
    getSearch(event.target.value);
  };

  showUserOptions = () => {
    const { dropDown } = this.state;

    this.setState({ dropDown: !dropDown });
  };

  logout = e => {
    const { logoff } = this.props;

    eraseToken();
    logoff();
  };

  render() {
    const { user } = this.props;
    const { search, dropDown } = this.state;

    return (
      <div className="header">
        <div id="logo">
          <img
            id="jobsity-logo"
            src={require("../img/jobsity.png")}
            alt=""
            align="centerS"
          />
        </div>
        <div className="text" id="title">
          Bookshelf
        </div>
        <div className="text search">
          <form method="get" id="search-bar" onChange={this.handleSearch}>
            <input
              name="q"
              type="text"
              size={40}
              placeholder="Search..."
              value={search}
            />
          </form>
        </div>
        <div className="text" id="login">
          <span id="username">{user.full_name}</span>
          <span id="caron">ˇ</span>
          <img
            onClick={this.showUserOptions}
            id="profile-ph"
            src={require("../img/user.png")}
            alt=""
            align="right"
          />
          {dropDown && <HeaderDropdownMenu logout={this.logout} />}
        </div>
      </div>
    );
  }
}

export default Header;
