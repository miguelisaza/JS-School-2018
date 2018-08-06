import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ChipInput from "material-ui-chip-input";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTags } from "@fortawesome/free-solid-svg-icons";

import * as clipActions from "../../actions/clipActions";
import styles from "./editClipStyle";

library.add(faTags);

class TagsPopper extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    editableClip: PropTypes.object.isRequired,
    openTags: PropTypes.bool.isRequired,
    tagPopper: PropTypes.func.isRequired,
    editClip: PropTypes.func.isRequired,
    clips: PropTypes.array.isRequired
  };

  state = {
    editableTags: []
  };

  componentDidMount() {
    const { editableTags } = this.props;
    this.setState({ editableTags });
  }

  handleClick = () => {
    const { openTags, tagPopper } = this.props;
    tagPopper(!openTags);
  };

  handleChange = chips => {
    this.setState({ editableTags: chips });
  };

  handleSubmit = event => {
    const { editableClip, clips, editClip, openTags, tagPopper } = this.props;
    const { editableTags } = this.state;
    const { clipName } = editableClip;
    const idx = clips.findIndex(search => search.clipName === clipName);

    const clip = {
      ...editableClip,
      tags: editableTags
    };

    clips.splice(idx, 1, clip);
    editClip(clips);

    tagPopper(!openTags);
    event.preventDefault();
  };

  render() {
    const { classes, openTags, editableTags } = this.props;
    return (
      <Popper
        open={openTags}
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
          <DialogTitle color="secondary">Tags</DialogTitle>

          {openTags && (
            <ChipInput
              defaultValue={editableTags}
              classes={{
                root: classes.tagsRoot,
                inputRoot: classes.tagsInput
              }}
              onChange={chips => this.handleChange(chips)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon="tags" />
                  </InputAdornment>
                )
              }}
            />
          )}
          <InputLabel
            style={{
              position: "relative",
              left: "25px",
              fontSize: "12px"
            }}>
            Add a new tag by pressing enter
          </InputLabel>
          <DialogActions>
            <Button onClick={this.handleClick} color="secondary">
              Close
            </Button>
            <Button onClick={this.handleSubmit} type="submit" color="secondary">
              Save
            </Button>
          </DialogActions>
        </Paper>
      </Popper>
    );
  }
}

TagsPopper.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {
    clips,
    editableClip,
    openTags,
    editableTags,
    activeClip
  } = state.clipReducer;

  return {
    clips,
    editableClip,
    openTags,
    editableTags,
    activeClip
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(clipActions, dispatch);
}

let PopperWrap = withStyles(styles)(TagsPopper);

PopperWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopperWrap);

export default PopperWrap;
