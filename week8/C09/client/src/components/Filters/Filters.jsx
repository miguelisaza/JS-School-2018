import React, { Component } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import FilterTrigger from "./FilterTrigger";
import filterStyle from "./filterStyle";

class Filters extends Component {
  static propTypes = {
    classes: PropTypes.object
  };

  static defaultProps = {
    classes: {}
  };

  state = {
    activeFilter: ""
  };

  handleClick = filter => this.setState({ activeFilter: filter });

  render() {
    const { activeFilter } = this.state;
    const { classes } = this.props;

    return (
      <div className={`sidebar ${classes.filters}`}>
        <div>
          <h4 className={classes.filtersTitle}>MAIN</h4>

          <ul className={classes.icons} id="il">
            <FilterTrigger
              isActive={activeFilter === "All Books"}
              setToActive={this.handleClick}
              locationName="All Books"
            />
            <FilterTrigger
              isActive={activeFilter === "Quito"}
              setToActive={this.handleClick}
              locationName="Quito"
            />
            <FilterTrigger
              isActive={activeFilter === "Cartagena"}
              setToActive={this.handleClick}
              locationName="Cartagena"
            />
            <FilterTrigger
              isActive={activeFilter === "Medellin"}
              setToActive={this.handleClick}
              locationName="Medellin"
            />
            <FilterTrigger
              isActive={activeFilter === "Digital"}
              setToActive={this.handleClick}
              locationName="Digital"
              faIcon="fa fa-tablet"
            />
            <FilterTrigger
              isActive={activeFilter === "Personal Loans"}
              setToActive={this.handleClick}
              locationName="Personal Loans"
              faIcon="fa fa-user"
            />
          </ul>
        </div>
      </div>
    );
  }
}

const FilterWrap = injectSheet(filterStyle)(Filters);

export default FilterWrap;
