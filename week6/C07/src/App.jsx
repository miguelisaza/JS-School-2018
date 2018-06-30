import React, { Component } from 'react';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import Login from './components/Login';

import Route from 'react-router-dom/Route'

class Main extends Component {

  state = {
    filter: ''
  }

  getSearch = (dataFromChild) => this.setState({ filter: dataFromChild })

  render() {

    return (
      <div className="Main">
        <Header getSearch={this.getSearch} />
        <Wrapper filter={this.state.filter} />
      </div>

    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/' exact component={Login} />
        <Route path='/main/' exact component={Main} />
      </div>
    );
  }
}

export default App;