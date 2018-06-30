import React, { Component } from 'react';
import Filters from './Filters'
import Trends from './Trends'
import BooksContainer from './BooksContainer';


class Wrapper extends Component {

  state = {
    location: ''
  }

  getLocation = (dataFromChild) => this.setState({ location: dataFromChild })

  render() {
    return (
      <div className="wrapper">
        <Filters getLocation={this.getLocation} />
        <BooksContainer filter={this.props.filter} location={this.state.location} />
        <Trends />
      </div>
    );
  }
}

export default Wrapper; 