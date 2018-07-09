import React, { Component } from "react";
import PropTypes from "prop-types";
import Filters from "./Filters";
import Trends from "./Trends";
import BooksContainer from "./BooksContainer";

class Wrapper extends Component {
  static propTypes = {
    filter: PropTypes.string,
    match: PropTypes.object,
    user: PropTypes.object
  };

  static defaultProps = {
    filter: "",
    match: {},
    user: {}
  };

  state = {
    location: ""
  };

  getLocation = dataFromChild => this.setState({ location: dataFromChild });

  render() {
    const { location } = this.state;
    const { filter, match, user } = this.props;

    return (
      <div className="wrapper">
        <Filters getLocation={this.getLocation} match={match} />
        <BooksContainer filter={filter} location={location} user={user} />
        <Trends />
      </div>
    );
  }
}

export default Wrapper;
