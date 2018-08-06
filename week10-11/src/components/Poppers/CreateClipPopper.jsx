import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";

import { of } from "rxjs/observable/of";
import { delay } from "rxjs/operators";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import * as clipActions from "../../actions/clipActions";
import * as validation from "../../controllers/validation";
import styles from "./createClipStyle";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      format="##:##"
      mask={["m", "m", "s", "s"]}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

class CreateClipPopper extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    openCreate: PropTypes.bool.isRequired,
    createPopper: PropTypes.func.isRequired,
    addClip: PropTypes.func.isRequired,
    clips: PropTypes.array.isRequired
  };

  state = {
    clipName: "",
    startTime: "00:00",
    endTime: "00:00",
    error: false,
    nameIsInvalid: false
  };

  handleClick = () => {
    const { openCreate, createPopper } = this.props;
    createPopper(!openCreate);
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    const debounceTimer$ = of(null);

    // (RxJS) validate after 500ms of end of input
    debounceTimer$.pipe(delay(500)).subscribe({
      next: () => {
        const { startTime, endTime, clipName } = this.state;
        const nameIsValid = validation.validateName(clipName);
        const isValid = validation.validateTimes(endTime, startTime);
        if (!isValid) {
          this.setState({ error: true });
        } else {
          this.setState({ error: false });
        }

        if (nameIsValid) {
          this.setState({ nameIsInvalid: false });
        } else {
          this.setState({ nameIsInvalid: true });
        }
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { clips, addClip, createPopper, openCreate } = this.props;
    const { clipName, startTime, endTime, error } = this.state;

    const startSec = validation.timeStringToSeconds(startTime);
    const endSec = validation.timeStringToSeconds(endTime);

    let clip = {
      clipName,
      startTime: startSec.toString(),
      endTime: endSec.toString(),
      tags: []
    };

    if (!error) {
      clip = validation.zeroFill(clip);
      clips.push(clip);
      addClip(clips);

      this.setState({
        clipName: "",
        startTime: "00:00",
        endTime: "00:00"
      });

      createPopper(!openCreate);
    }
  };

  render() {
    const { classes, openCreate } = this.props;
    const { clipName, startTime, endTime, error, nameIsInvalid } = this.state;
    return (
      <Popper
        open={openCreate}
        placement="left-end"
        disablePortal
        modifiers={{
          flip: {
            enabled: true
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: "scrollParent"
          }
        }}>
        <Paper className={classes.paper}>
          <DialogTitle color="secondary">Add New Clip</DialogTitle>
          <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <TextField
              error={nameIsInvalid}
              id="clipName"
              label="Clip Name"
              className={classes.titleInput}
              value={clipName}
              margin="normal"
            />
            <TextField
              error={error}
              id="startTime"
              label="From"
              className={classes.timeInput}
              value={startTime}
              margin="normal"
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
            />
            <TextField
              error={error}
              id="endTime"
              label="To"
              className={classes.timeInput}
              value={endTime}
              margin="normal"
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
            />
            <DialogActions>
              <Button onClick={this.handleClick} color="secondary">
                Cancel
              </Button>
              <Button
                color="secondary"
                type="submit"
                disabled={nameIsInvalid || error}>
                Add
              </Button>
            </DialogActions>
          </form>
        </Paper>
      </Popper>
    );
  }
}

const mapStateToProps = state => {
  const { openCreate, clips } = state.clipReducer;

  return {
    openCreate,
    clips
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(clipActions, dispatch);
}

let PopperWrap = withStyles(styles)(CreateClipPopper);

PopperWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopperWrap);

export default PopperWrap;
