import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import CreateClipPopper from "../Poppers/CreateClipPopper";
import * as clipActions from "../../actions/clipActions";
import styles from "./fabStyle";

class FloatingActionButton extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    openCreate: PropTypes.bool.isRequired,
    createPopper: PropTypes.func.isRequired
  };

  handleClick = () => {
    const { openCreate, createPopper } = this.props;
    createPopper(!openCreate);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button
          onClick={this.handleClick}
          variant="fab"
          color="secondary"
          aria-label="Add"
          className={classes.button}>
          <AddIcon />
        </Button>
        <CreateClipPopper />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { openCreate } = state.clipReducer;

  return {
    openCreate
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(clipActions, dispatch);
}
let FABWrap = withStyles(styles)(FloatingActionButton);

FABWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(FABWrap);

export default FABWrap;
