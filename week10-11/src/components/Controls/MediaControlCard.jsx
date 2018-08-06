import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { of } from "rxjs/observable/of";
import { delay } from "rxjs/operators";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Switch from "@material-ui/core/Switch";

import * as playbackActions from "../../actions/playbackActions";
import * as clipActions from "../../actions/clipActions";
import * as videoController from "../../controllers/videoController";
import styles from "./controlCardStyles";

class MediaControlCard extends Component {
  static propTypes = {
    clips: PropTypes.array.isRequired,
    clipsIdx: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
    activeClip: PropTypes.object.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    convertPlayPauseButton: PropTypes.func.isRequired,
    attachVideoToControls: PropTypes.func.isRequired,
    loadClip: PropTypes.func.isRequired
  };

  state = {
    ready: false
  };

  componentDidMount() {
    const { attachVideoToControls } = this.props;
    const video = document.getElementById("videoPlayer");
    attachVideoToControls(video);
    this.setState({ ready: true });
  }

  componentDidUpdate() {
    // when a clip is selected, the component updates
    // and the startTime of the selected clip is set to the player
    const {
      activeClip,
      toPrevVideo,
      playPrevVideo,
      toNextVideo,
      playNextVideo,
      keyEvent,
      resetKeyEvent,
      autoplay
    } = this.props;

    videoController.setCurrentTime(activeClip.startTime);

    if (toNextVideo) {
      this.next();
      if (keyEvent) {
        this.next();
        resetKeyEvent();
      }
      if (autoplay) {
        this.playPause();
      }
      playNextVideo(false);
    }

    if (toPrevVideo) {
      this.previous();
      if (keyEvent) {
        resetKeyEvent();
      }
      if (autoplay) {
        this.playPause();
      }
      playPrevVideo(false);
    }
  }

  playPause = () => {
    const { isPlaying, convertPlayPauseButton, activeClip } = this.props;
    const { startTime, endTime } = activeClip;

    // duration of the clip in miliseconds
    const duration = (parseInt(endTime, 10) - parseInt(startTime, 10)) * 1000;

    const play = () => {
      convertPlayPauseButton(!isPlaying);
      videoController.playVideo();
    };

    const pause = () => {
      convertPlayPauseButton(!isPlaying);
      videoController.pauseVideo();
    };

    if (!isPlaying) {
      play();

      // RxJS observable who stops the clip when its finished
      const pauseTimer$ = of(null);
      pauseTimer$.pipe(delay(duration)).subscribe({
        next: () => {
          // read the realtime value of this prop
          const { isPlaying, startCountdownToNextClip } = this.props;
          if (isPlaying) {
            convertPlayPauseButton(!isPlaying);
            videoController.pauseVideo();
            startCountdownToNextClip();
            // nextClipTimeout();
          }
        }
      });
    } else {
      pause();
    }
  };

  previous = () => {
    const { clips, clipsIdx } = this.props;
    const prev = clipsIdx - 1;
    const prevClip = clips[prev];

    if (prevClip) {
      const { loadClip } = this.props;
      loadClip(prevClip, prev);
    }
  };

  next = () => {
    const { clips, clipsIdx } = this.props;
    const next = clipsIdx + 1;
    const nextClip = clips[next];

    if (nextClip) {
      const { loadClip, autoplay, playNextVideo } = this.props;
      loadClip(nextClip, next);
      if (autoplay) {
        playNextVideo(true);
      }
    }
  };

  autoplay = event => {
    const { toggleAutoplay } = this.props;
    toggleAutoplay(event.target.checked);
  };

  render() {
    const { classes, isPlaying, activeClip, autoplay } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="headline">{activeClip.clipName}</Typography>
              <Typography variant="subheading" color="textSecondary">
                {`00:${activeClip.startTime} - 00:${activeClip.endTime}`}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton aria-label="Previous">
                <SkipPreviousIcon onClick={this.previous} />
              </IconButton>
              <IconButton onClick={this.playPause} aria-label="Play/pause">
                {isPlaying ? (
                  <PauseIcon className={classes.playIcon} />
                ) : (
                  <PlayArrowIcon className={classes.playIcon} />
                )}
              </IconButton>
              <IconButton aria-label="Next">
                <SkipNextIcon onClick={this.next} />
              </IconButton>
            </div>
            <div className={classes.autoplay}>
              <Typography>Autoplay Clips</Typography>
              <Switch
                checked={autoplay}
                onChange={this.autoplay}
                value="autoplay"
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    isPlaying,
    video,
    toNextVideo,
    toPrevVideo,
    keyEvent
  } = state.playbackReducer;
  const { activeClip, clips, clipsIdx, autoplay } = state.clipReducer;

  return {
    isPlaying,
    video,
    activeClip,
    clips,
    clipsIdx,
    toNextVideo,
    toPrevVideo,
    autoplay,
    keyEvent
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...playbackActions, ...clipActions }, dispatch);
}

let MediaControlWrap = withStyles(styles, { withTheme: true })(
  MediaControlCard
);

MediaControlWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaControlWrap);

export default MediaControlWrap;
