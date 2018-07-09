import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { doLogin } from "../services/loginService";
import "../css/login.css";

class Login extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    login: PropTypes.func
  };

  static defaultProps = {
    isLoggedIn: false,
    login: () => {}
  };

  state = {
    Username: "",
    Password: "",
    error: ""
  };

  handleChange = event =>
    this.setState({ [event.target.placeholder]: event.target.value });

  handleSubmit = event => {
    const { Username, Password } = this.state;
    const { login } = this.props;
    doLogin(Username, Password).then(res => {
      if (typeof res === "string") {
        this.setState({ error: res });
      }

      if (typeof res === "boolean") {
        login(res);
      }
    });
    event.preventDefault();
  };

  render() {
    const { Username, Password, error } = this.state;
    const { isLoggedIn } = this.props;
    console.log(error);
    if (isLoggedIn) {
      return <Redirect to="/main" />;
    }

    return (
      <div className="login-page">
        <div className="login-header">
          <img
            src={require("../img/jobsity.png")}
            alt="Jobsity"
            algin="center"
          />
          <p>Bookshelf</p>
        </div>
        <div className="login-form">
          <form
            className="l-login-form"
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}>
            {error && <span className="login-span">{error}</span>}

            <input type="text" placeholder="Username" value={Username} />
            <input type="password" placeholder="Password" value={Password} />
            <button>login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default extraProps => (...routerParams) => (
  <Login {...routerParams} {...extraProps} />
);
