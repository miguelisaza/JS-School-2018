import React, { Component } from "react";
// import { Route, Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class FilterTrigger extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    setToActive: PropTypes.func,
    getLocation: PropTypes.func,
    locationName: PropTypes.string,
    faIcon: PropTypes.string
  };

  static defaultProps = {
    isActive: false,
    setToActive: () => {},
    getLocation: () => {},
    locationName: "",
    faIcon: "fa fa-map-marker"
  };

  selectFilter = event => {
    const { getLocation, setToActive, locationName } = this.props;

    getLocation(event.target.id);
    setToActive(locationName);
  };

  deactivate = () => {
    const { getLocation, setToActive } = this.props;
    getLocation("");
    setToActive("");
  };

  render() {
    const { locationName, isActive, faIcon } = this.props;

    return (
      <li
        id={locationName}
        onClick={this.selectFilter}
        onDoubleClick={this.deactivate}
        className={isActive ? "selected" : ""}>
        {/*         <Link to={`${this.props.match.path}${this.props.locationName}`} />  */}
        <i className={faIcon} />
        {locationName}{" "}
      </li>
    );
  }
}

export default FilterTrigger;
