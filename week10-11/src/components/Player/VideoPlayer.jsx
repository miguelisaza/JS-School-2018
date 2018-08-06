import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { timer, interval } from "rxjs";
import { map, take } from "rxjs/operators";

import * as videoController from "../../controllers/videoController";
import * as clipActions from "../../actions/clipActions";
import * as playbackActions from "../../actions/playbackActions";

import styles from "./playerStyle";

class VideoPlayer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    source: PropTypes.string.isRequired,
    clipHasFinished: PropTypes.bool.isRequired,
    autoplay: PropTypes.bool.isRequired,
    resetCountdownToNextClip: PropTypes.func.isRequired,
    playNextVideo: PropTypes.func.isRequired
  };

  state = {
    upcomingVideoProgresBar: 0,
    countDown: 0
  };

  componentDidUpdate() {
    const { clipHasFinished, autoplay } = this.props;
    if (clipHasFinished && autoplay) {
      this.nextClipTimeout();
    }
  }

  nextClipTimeout = () => {
    const { resetCountdownToNextClip, playNextVideo } = this.props;

    const count = 3;
    const countDown$ = timer(0, 1000);
    const upcomingVideoProgresBarAnim$ = interval(30);

    resetCountdownToNextClip();

    countDown$
      .pipe(
        map(i => count - i),
        take(count + 1)
      )
      .subscribe({
        next: countDown => {
          this.setState({ countDown });
        },
        complete: () => {
          this.setState({
            countDown: 0,
            upcomingVideoProgresBar: 0
          });
          playNextVideo(true);
        }
      });

    upcomingVideoProgresBarAnim$.pipe(take(100)).subscribe({
      next: upcomingVideoProgresBar => {
        this.setState({ upcomingVideoProgresBar });
      }
    });
  };

  render() {
    const { classes, source } = this.props;
    const { countDown, upcomingVideoProgresBar } = this.state;
    return (
      <div className="Videoclipper">
        <video id="videoPlayer" className={classes.player}>
          <source src={source} />
        </video>
        {countDown && (
          <Typography
            className={classes.countDownText}
            variant="display3"
            gutterBottom>
            {countDown}
          </Typography>
        )}
        <CircularProgress
          className={classes.progress}
          color="secondary"
          variant="determinate"
          size="125"
          value={upcomingVideoProgresBar}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { clipHasFinished } = state.playbackReducer;
  const { activeClip, autoplay } = state.clipReducer;

  return {
    clipHasFinished,
    autoplay,
    activeClip
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...playbackActions, ...clipActions }, dispatch);
}

let VideoPlayerWrap = withStyles(styles)(VideoPlayer);

VideoPlayerWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayerWrap);

export default VideoPlayerWrap;
