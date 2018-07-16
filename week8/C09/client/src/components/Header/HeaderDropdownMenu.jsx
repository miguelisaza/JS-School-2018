import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import headerStyle from "./headerStyle";
import { eraseToken } from "../../config/session";
import * as userActions from "../../actions/userActions";
import { persistor } from "../../store";

class HeaderDropDownMenu extends Component {
  static propTypes = {
    logout: PropTypes.func,
    classes: PropTypes.object
  };

  static defaultProps = {
    logout: () => {},
    classes: {}
  };

  logout = () => {
    const { logout } = this.props;
    localStorage.clear();
    eraseToken();
    logout();
    persistor.purge();
  };

  render() {
    const { classes } = this.props;
    return (
      <div id="userDrop" className={classes.dropDown}>
        <a onClick={this.logout}>Sign Out</a>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer: { isLoggedIn } }) => ({
  isLoggedIn
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActions, dispatch);
}

let DropDownWrap = injectSheet(headerStyle)(HeaderDropDownMenu);

DropDownWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(DropDownWrap);

export default DropDownWrap;
