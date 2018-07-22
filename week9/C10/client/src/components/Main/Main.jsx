import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import injectSheet from "react-jss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReduxToastr, { actions as toastrActions } from "react-redux-toastr";
import io from "socket.io-client";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import * as userActions from "../../actions/userActions";
import Header from "../Header/Header";
import Wrapper from "../Wrapper/Wrapper";
import { decodeUser } from "../../config/session";
import { socketUri } from "../../config/services";
import mainStyle from "./mainStyle";

class Main extends Component {
  static propTypes = {
    classes: PropTypes.object,
    isLoggedIn: PropTypes.bool,
    logout: PropTypes.func,
    load: PropTypes.func,
    add: PropTypes.func
  };

  static defaultProps = {
    classes: {},
    isLoggedIn: false,
    logout: () => {},
    load: () => {},
    add: () => {}
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

  componentDidMount() {
    const socket = io(socketUri);

    socket.on("reservation", data => {
      const { title } = data;
      const message = `${title} has been lent just now`;

      // toast notification
      this.toast("info", "Bookshelf Update", message);
    });
  }

  getSearch = dataFromChild => this.setState({ filter: dataFromChild });

  toast = (type, title, message) => {
    const { add } = this.props;
    add({
      type,
      title,
      message,
      position: "bottom-right",
      options: {}
    });
  };

  render() {
    const { filter } = this.state;

    const { classes, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <div className={classes.main}>
        <ReduxToastr
          timeOut={5000}
          newestOnTop={false}
          preventDuplicates
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
        />
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
  return bindActionCreators({ ...userActions, ...toastrActions }, dispatch);
}

MainWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainWrap);

export default MainWrap;
