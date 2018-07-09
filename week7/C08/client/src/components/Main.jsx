import React, { Component } from "react";
import { Redirect } from "react-router";
/* import PropTypes from "prop-types"; */
import Header from "./Header";
import Wrapper from "./Wrapper";
import { decodeUser } from "../config/session";

class Main extends Component {
  state = {
    backToLogin: false,
    filter: "",
    user: {}
  };

  componentWillMount() {
    const user = decodeUser();
    if (!user) {
      this.setState({ backToLogin: true });
    }
    this.setState({ user });
  }

  getSearch = dataFromChild => this.setState({ filter: dataFromChild });

  logoff = () => {
    const { login } = this.props;
    this.setState({ backToLogin: true });
    login(false);
  };

  render() {
    const { filter, user, backToLogin } = this.state;

    if (backToLogin) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="Main">
        <Header getSearch={this.getSearch} user={user} logoff={this.logoff} />
        <Wrapper filter={filter} user={user} />
      </div>
    );
  }
}

export default extraProps => (...routerParams) => (
  <Main {...routerParams} {...extraProps} />
);
