import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import injectSheet from "react-jss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import Header from "../Header/Header";
import Wrapper from "../Wrapper/Wrapper";
import { decodeUser } from "../../config/session";
import mainStyle from "./mainStyle";

class Main extends Component {
  static propTypes = {
    classes: PropTypes.object,
    isLoggedIn: PropTypes.bool,
    logout: PropTypes.func,
    load: PropTypes.func
  };

  static defaultProps = {
    classes: {},
    isLoggedIn: false,
    logout: () => {},
    load: () => {}
  };

  state = {
    filter: ""
  };

  componentWillMount() {
    const { logout, load } = this.props;

    const user = decodeUser();
    if (!user) {
      logout();
    }
    load(user);
  }

  getSearch = dataFromChild => this.setState({ filter: dataFromChild });

  render() {
    const { filter } = this.state;

    const { classes, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <div className={classes.main}>
        <Header getSearch={this.getSearch} />
        <Wrapper filter={filter} />
      </div>
    );
  }
}

let MainWrap = injectSheet(mainStyle)(Main);

const mapStateToProps = state => {
  const { isLoggedIn, user } = state.userReducer;

  return {
    isLoggedIn,
    user
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActions, dispatch);
}

MainWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainWrap);

export default MainWrap;
