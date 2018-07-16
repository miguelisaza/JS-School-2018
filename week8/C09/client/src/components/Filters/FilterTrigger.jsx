import React, { Component } from "react";
import { push } from "connected-react-router";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as bookActions from "../../actions/bookActions";
import filterStyle from "./filterStyle";

class FilterTrigger extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    setToActive: PropTypes.func,
    locationName: PropTypes.string,
    locationFilter: PropTypes.func,
    faIcon: PropTypes.string,
    classes: PropTypes.object
  };

  static defaultProps = {
    isActive: false,
    setToActive: () => {},
    locationFilter: () => {},
    locationName: "",
    faIcon: "fa fa-map-marker",
    classes: {}
  };

  selectFilter = () => {
    const { setToActive, locationName, locationFilter, push } = this.props;
    locationFilter(locationName);
    setToActive(locationName);
    push(`/main/${locationName}`);
  };

  render() {
    const { locationName, isActive, faIcon, classes } = this.props;
    return (
      <li
        id={locationName}
        onClick={this.selectFilter}
        className={isActive ? classes.selected : ""}>
        <i className={faIcon} />
        {locationName}{" "}
      </li>
    );
  }
}

const mapStateToProps = ({ router: { location: pathname } }) => pathname;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...bookActions, push }, dispatch);
}

let TriggerWrap = injectSheet(filterStyle)(FilterTrigger);

TriggerWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(TriggerWrap);
export default TriggerWrap;
