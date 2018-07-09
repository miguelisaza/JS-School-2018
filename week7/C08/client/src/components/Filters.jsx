import React, { Component } from "react";
// import { Route, Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import FilterTrigger from "./FilterTrigger";

class Filters extends Component {
  static propTypes = {
    getLocation: PropTypes.func,
    match: PropTypes.object
  };

  static defaultProps = {
    getLocation: "",
    match: {}
  };

  state = {
    activeFilter: ""
  };

  handleClick = filter => this.setState({ activeFilter: filter });

  render() {
    const { activeFilter } = this.state;
    const { getLocation, match } = this.props;

    return (
      <div className="sidebar filters">
        <div className="book-filters">
          <h4 className="sidebar-section">MAIN</h4>
          <ul className="icon-list" id="il">
            <FilterTrigger
              isActive={activeFilter === "Quito"}
              setToActive={this.handleClick}
              getLocation={getLocation}
              locationName="Quito"
              match={match}
            />
            <FilterTrigger
              isActive={activeFilter === "Cartagena"}
              setToActive={this.handleClick}
              getLocation={getLocation}
              locationName="Cartagena"
              match={match}
            />
            <FilterTrigger
              isActive={activeFilter === "Medellin"}
              setToActive={this.handleClick}
              getLocation={getLocation}
              locationName="Medellin"
              match={match}
            />
            <FilterTrigger
              isActive={activeFilter === "Digital"}
              setToActive={this.handleClick}
              getLocation={getLocation}
              locationName="Digital"
              faIcon="fa fa-tablet"
              match={match}
            />
            <FilterTrigger
              isActive={activeFilter === "Personal Loans"}
              setToActive={this.handleClick}
              getLocation={getLocation}
              locationName="Personal Loans"
              faIcon="fa fa-user"
              match={match}
            />
          </ul>
        </div>
      </div>
    );
  }
}

export default Filters;
