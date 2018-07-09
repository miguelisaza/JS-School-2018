import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import MainWrapper from "./components/Main";
import LoginWrapper from "./components/Login";

class App extends Component {
  state = {
    isLoggedIn: false
  };

  checkLogin = isIt => {
    this.setState({
      isLoggedIn: isIt
    });
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <div className="App">
        <Route path="/" exact render={() => <Redirect to="/login/" />} />
        <Route
          path="/login/"
          component={LoginWrapper({
            login: this.checkLogin,
            isLoggedIn
          })}
        />
        <Route
          path="/main/"
          component={MainWrapper({
            login: this.checkLogin,
            isLoggedIn
          })}
        />
      </div>
    );
  }
}

export default App;
