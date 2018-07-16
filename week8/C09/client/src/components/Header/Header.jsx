import React, { Component } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as bookActions from "../../actions/bookActions";
import HeaderDropdownMenu from "./HeaderDropdownMenu";

import headerStyle from "./headerStyle";

class Header extends Component {
  static propTypes = {
    searchFilter: PropTypes.func,
    user: PropTypes.object,
    classes: PropTypes.object
  };

  static defaultProps = {
    searchFilter: {},
    user: {},
    classes: {}
  };

  state = {
    search: "",
    dropDown: false
  };

  handleSearch = event => {
    const { searchFilter } = this.props;
    const { value } = event.target;

    searchFilter(value);
    this.setState({ search: event.target.value });
  };

  showUserOptions = () => {
    const { dropDown } = this.state;

    this.setState({ dropDown: !dropDown });
  };

  render() {
    const { user, classes } = this.props;
    const { search, dropDown } = this.state;

    return (
      <div className={classes.header}>
        <div id="logo">
          <img
            id="jobsity-logo"
            src="/img/jobsity.png"
            alt=""
            align="centerS"
          />
        </div>
        <div className={`${classes.text} ${classes.title}`}>Bookshelf</div>
        <div className={`${classes.search} ${classes.text} `}>
          <form
            method="get"
            id="search-bar"
            onChange={this.handleSearch}
            onSubmit={e => {
              e.preventDefault();
            }}>
            <input
              name="q"
              type="text"
              size={40}
              placeholder="Search..."
              value={search}
            />
          </form>
        </div>
        <div className={`${classes.text} ${classes.login}`}>
          <span id="username">{user.full_name}</span>
          <span id="caron">ˇ</span>
          <img
            onClick={this.showUserOptions}
            id="profile-ph"
            src="../img/user.png"
            alt=""
            align="right"
          />
          {dropDown && <HeaderDropdownMenu />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.userReducer;
  const { filterText, location } = state.bookReducer;

  return {
    location,
    filterText,
    user
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(bookActions, dispatch);
}

let HeaderWrap = injectSheet(headerStyle)(Header);

HeaderWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderWrap);

export default HeaderWrap;
