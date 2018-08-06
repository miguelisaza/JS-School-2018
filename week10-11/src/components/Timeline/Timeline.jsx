import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faBookmark } from "@fortawesome/free-solid-svg-icons";

import styles from "./timelineStyle";

import * as validation from "../../controllers/validation";
import * as clipActions from "../../actions/clipActions";
import * as playbackActions from "../../actions/playbackActions";
import * as videoController from "../../controllers/videoController";

library.add(faMapPin, faBookmark);

class Timeline extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    completed: 0,
    buffer: 0,
    ready: false,
    current: "00:00"
  };

  componentDidMount() {
    this.setState({ ready: true });
  }

  video = () => ({
    currentTime: videoController.getCurrentTime(),
    currentBuffer: videoController.getCurrentBufferTime(),
    duration: videoController.getVideoDuration()
  });

  progress = video => {
    const { currentTime, buffered, duration } = video;
    const currentBuffer = buffered.end(0);

    const secs = Math.floor(currentTime);
    const current = validation.secondsToTimeString(secs);

    const completed = (100 / duration) * currentTime;
    const buffer = (100 / duration) * currentBuffer;

    this.setState({
      completed,
      buffer,
      current
    });
  };

  markerX = marker => {
    const { duration } = this.video();
    const position = (100 / duration) * marker;
    return position;
  };

  loadClip = (clip, idx) => {
    const { loadClip } = this.props;
    loadClip(clip, idx);
  };

  render() {
    const { classes, clips } = this.props;
    const { completed, buffer, ready, current } = this.state;

    if (ready) {
      const video = videoController.getVideoFromStore();

      video.ontimeupdate = () => {
        this.progress(video);
      };
    }
    return (
      <div className={classes.root}>
        <LinearProgress
          className={classes.bar}
          color="secondary"
          variant="buffer"
          value={completed}
          valueBuffer={buffer}
        />
        {ready &&
          clips.map((clip, idx) => (
            <Fragment>
              <Tooltip
                classes={{ tooltip: classes.tooltip }}
                title={clip.clipName}
                placement="top-end"
                TransitionComponent={Zoom}>
                <FontAwesomeIcon
                  onClick={this.loadClip.bind(null, clip, idx)}
                  className={classes.marker}
                  icon="bookmark"
                  style={{
                    left: `${this.markerX(parseInt(clip.startTime, 10))}%`
                  }}
                />
              </Tooltip>
            </Fragment>
          ))}
        <Typography className={classes.currTime} variant="caption" gutterBottom>
          {current}
        </Typography>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { clipHasFinished, toPrevVideo, toNextVideo } = state.playbackReducer;
  const { activeClip, clips, clipsIdx, numOfClips } = state.clipReducer;

  return {
    toPrevVideo,
    toNextVideo,
    clipHasFinished,
    activeClip,
    clips,
    clipsIdx,
    numOfClips
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...playbackActions, ...clipActions }, dispatch);
}

let TimelineWrap = withStyles(styles)(Timeline);

TimelineWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineWrap);

export default TimelineWrap;
