import React, { Component } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as userActions from "../../actions/userActions";
import { doLogin } from "../../services/loginService";
import loginStyle from "./loginStyle";

class Login extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    login: PropTypes.func,
    classes: PropTypes.object
  };

  static defaultProps = {
    isLoggedIn: false,
    login: () => {},
    classes: {}
  };

  state = {
    Username: "",
    Password: "",
    error: ""
  };

  componentDidMount(){
    localStorage.clear();
  }
  
  handleChange = event =>
    this.setState({ [event.target.placeholder]: event.target.value });

  handleSubmit = event => {
    const { Username, Password } = this.state;
    const { login } = this.props;
    doLogin(Username, Password).then(res => {
      if (typeof res === "string") {
        this.setState({ error: res });
      }

      if (typeof res === "object") {
        login(res);
      }
    });
    event.preventDefault();
  };

  render() {
    const { Username, Password, error } = this.state;
    const { isLoggedIn, classes } = this.props;
    if (isLoggedIn) {
      return <Redirect to="/main" />;
    }

    return (
      <div className={classes.loginPage}>
        <div className={classes.loginHeader}>
          <img src="../img/jobsity.png" alt="Jobsity" algin="center" />
          <p>Bookshelf</p>
        </div>
        <div className={classes.loginForm}>
          <form
            className="l-login-form"
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}>
            {error && <span className={classes.loginSpan}>{error}</span>}

            <input type="text" placeholder="Username" value={Username} />
            <input type="password" placeholder="Password" value={Password} />

            <button className={classes.loginFormButton} type="submit">
              login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isLoggedIn, error } = state.userReducer;

  return {
    isLoggedIn,
    error
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActions, dispatch);
}

let LoginWrap = injectSheet(loginStyle)(Login);

LoginWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginWrap);

export default LoginWrap;
