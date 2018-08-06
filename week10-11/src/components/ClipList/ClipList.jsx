import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import { library } from "@fortawesome/fontawesome-svg-core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCut, faFilm, faTags } from "@fortawesome/free-solid-svg-icons";

import EditClipPopper from "../Poppers/EditClipPopper";
import TagsPopper from "../Poppers/TagsPopper";

import * as clipActions from "../../actions/clipActions";
import * as videoController from "../../controllers/videoController";
import styles from "./clipStyles";

library.add(faCut, faFilm, faTags);

class ClipList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    clips: PropTypes.array.isRequired,
    openEdit: PropTypes.bool.isRequired,
    loadClip: PropTypes.func.isRequired,
    removeClip: PropTypes.func.isRequired,
    editPopper: PropTypes.func.isRequired,
    loadEditableClip: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.getDuration = this.getDuration.bind(this);
  }

  state = {
    ready: false,
    loaded: false,
    main: {
      clipName: "Main Video",
      startTime: "00",
      endTime: "00"
    },
    current: "00:00"
  };

  componentDidMount() {
    this.setState(
      {
        ready: true,
        loaded: true
      },
      () => {
        this.bindDuration();
      }
    );
  }

  getDuration(video) {
    const { main } = this.state;
    let { duration } = video;
    duration = Math.floor(duration);
    this.setState({
      main: {
        ...main,
        endTime: duration
      },
      loaded: false
    });
  }

  loadClip = (clip, idx) => {
    const { loadClip } = this.props;
    loadClip(clip, idx);
  };

  deleteClip = clip => {
    const { clips, removeClip } = this.props;
    const { clipName } = clip;
    const idx = clips.findIndex(search => search.clipName === clipName);
    clips.splice(idx, 1);
    removeClip(clips);
  };

  editClip = clip => {
    const { loadEditableClip, openEdit, editPopper } = this.props;
    loadEditableClip(clip);
    editPopper(!openEdit);
  };

  openTags = clip => {
    const { loadEditableClip, openTags, tagPopper, loadTags } = this.props;
    const { tags } = clip;

    loadEditableClip(clip);

    if (!openTags) {
      loadTags(tags);
    }
    tagPopper(!openTags);
  };

  filterClips = (inclutions, clips) => {
    const filter = [];
    clips.forEach((clip, idx) => {
      if (inclutions[idx]) {
        filter.push(clip);
      }
    });

    return filter;
  };

  bindDuration() {
    const { ready, loaded } = this.state;

    if (ready && loaded) {
      const video = videoController.getVideoFromStore();
      video.onloadedmetadata = this.getDuration.bind(this, video);

    }
  }

  render() {
    const {
      classes,
      clips,
      openEdit,
      openTags,
      tagFilter,
      isPlaying
    } = this.props;
    const { ready, main, current } = this.state;

    const inclutions = [];
    let out = [];

    clips.forEach((clip, idx) => {
      const { tags } = clip;
      const truth = tags.includes(tagFilter);
      inclutions.splice(idx, 1, truth);
    });

    const filtered = this.filterClips(inclutions, clips);

    if (tagFilter) {
      out = filtered;
    } else {
      out = clips;
    }

    return (
      <MenuList className={classes.menuList}>
        <MenuItem
          onClick={this.loadClip.bind(null, main, -1)}
          className={classes.menuItem}>
          <ListItemIcon>
            <FontAwesomeIcon icon="film" />
          </ListItemIcon>
          <ListItemText
            className={classes.clipTitle}
            classes={{ primary: classes.primary }}
            inset
            primary={main.clipName}
          />
        </MenuItem>
        {ready &&
          out.map((clip, idx) => (
            <MenuItem key={clip.clipName} className={classes.menuItem}>
              <div
                className={classes.textContainer}
                onClick={this.loadClip.bind(null, clip, idx)}>
                <ListItemIcon>
                  <FontAwesomeIcon className={classes.icon} icon="cut" />
                </ListItemIcon>

                <ListItemText
                  className={classes.clipTitle}
                  // onClick={this.loadClip.bind(null, clip, idx)}
                  classes={{ primary: classes.primary }}
                  primary={clip.clipName}
                />
                <Typography
                  className={classes.clipTime}
                  variant="caption"
                  gutterBottom>
                  {`00:${clip.startTime} - 00:${clip.endTime}`}
                </Typography>
              </div>
              <IconButton className={classes.iconButton}>
                <FontAwesomeIcon
                  onClick={this.openTags.bind(null, clip, idx)}
                  style={{ fontSize: "18px" }}
                  icon="tags"
                />
              </IconButton>
              <IconButton
                disabled={isPlaying}
                className={classes.iconButton}
                onClick={this.editClip.bind(null, clip, idx)}>
                <EditIcon />
              </IconButton>
              <IconButton
                disabled={isPlaying}
                className={classes.iconButton}
                onClick={this.deleteClip.bind(null, clip, idx)}>
                <DeleteIcon />
              </IconButton>
            </MenuItem>
          ))}
        {openEdit && <EditClipPopper />}
        {openTags && <TagsPopper />}
      </MenuList>
    );
  }
}

const mapStateToProps = state => {
  const {
    clips,
    numOfClips,
    openEdit,
    openTags,
    tagFilter
  } = state.clipReducer;

  const { isPlaying } = state.playbackReducer;
  return {
    clips,
    numOfClips,
    openEdit,
    openTags,
    tagFilter,
    isPlaying
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(clipActions, dispatch);
}

let ClipWrap = withStyles(styles)(ClipList);

ClipWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClipWrap);

export default ClipWrap;
