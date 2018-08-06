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
import styles from "./editClipStyle";

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

class EditClipPopper extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    editableClip: PropTypes.object.isRequired,
    openEdit: PropTypes.bool.isRequired,
    editPopper: PropTypes.func.isRequired,
    editClip: PropTypes.func.isRequired,
    clips: PropTypes.array.isRequired
  };

  state = {
    clipName: "",
    startTime: "00:00",
    endTime: "00:00",
    error: false,
    nameIsInvalid: false
  };

  componentDidMount() {
    const { openEdit } = this.props;
    let { editableClip } = this.props;

    editableClip = validation.zeroFill(editableClip);

    const { startTime, endTime } = editableClip;

    editableClip = {
      ...editableClip,
      startTime: validation.secondsToTimeString(startTime),
      endTime: validation.secondsToTimeString(endTime)
    };

    if (openEdit) {
      this.setState({ ...editableClip });
    }
  }

  handleClick = () => {
    const { openEdit, editPopper } = this.props;
    editPopper(!openEdit);
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });

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
    const { clips, editPopper, openEdit, editClip, editableClip } = this.props;
    const { clipName, startTime, endTime, error } = this.state;

    const idx = clips.findIndex(search => search.clipName === clipName);

    const startSec = validation.timeStringToSeconds(startTime);
    const endSec = validation.timeStringToSeconds(endTime);

    let editedClip = {
      ...editableClip,
      clipName,
      startTime: startSec.toString(),
      endTime: endSec.toString()
    };

    if (!error) {
      editedClip = validation.zeroFill(editedClip);
      clips.splice(idx, 1, editedClip);

      editClip(clips);

      this.setState({
        clipName: "",
        startTime: "00:00",
        endTime: "00:00"
      });

      editPopper(!openEdit);
    }

    event.preventDefault();
  };

  render() {
    const { classes, openEdit } = this.props;
    const { clipName, startTime, endTime, error, nameIsInvalid } = this.state;
    return (
      <Popper
        open={openEdit}
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
          <DialogTitle color="secondary">Edit Clip</DialogTitle>
          <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <TextField
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
                disabled={error || nameIsInvalid}>
                Edit
              </Button>
            </DialogActions>
          </form>
        </Paper>
      </Popper>
    );
  }
}

EditClipPopper.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { openEdit, clips, editableClip } = state.clipReducer;

  return {
    openEdit,
    clips,
    editableClip
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(clipActions, dispatch);
}

let PopperWrap = withStyles(styles)(EditClipPopper);

PopperWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopperWrap);

export default PopperWrap;
