import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { HotKeys } from "react-hotkeys";

import { fromEvent } from "rxjs";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";

import SearchBar from "material-ui-search-bar";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import ClipList from "../ClipList/ClipList";
import VideoPlayer from "../Player/VideoPlayer";
import Timeline from "../Timeline/Timeline";
import MediaControlCard from "../Controls/MediaControlCard";
import FloatingActionButton from "../FAB/FloatingActionButton";
import styles from "./drawerStyle";
import * as clipActions from "../../actions/clipActions";
import * as playbackActions from "../../actions/playbackActions";

class ClippedDrawer extends Component {
  state = { searchValue: "" };

  componentDidMount() {
    const { executeFilter } = this.props;
    executeFilter("");
    
    // use of observables to improve search
    // performance avoiding one request
    // per keystroke in search bar
    const inputEl = document.getElementById("search-input");
    const inputText$ = fromEvent(inputEl, "input");

    inputText$
      .pipe(
        map(e => e.target.value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe({
        next: value => {
          executeFilter(value);
        }
      });
  }

  search = event => {
    this.setState({ searchValue: event });
  };

  render() {
    const { classes, nextVideoKeyPress, previousVideoKeyPress } = this.props;
    const { searchValue } = this.state;

    const keyMap = {
      next: "alt+n",
      previous: "alt+b"
    };

    const handlers = {
      next: () => {
        nextVideoKeyPress();
      },
      previous: () => {
        previousVideoKeyPress();
      }
    };

    return (
      <HotKeys className={classes.root} keyMap={keyMap} handlers={handlers}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography
              className={classes.title}
              variant="title"
              color="inherit"
              noWrap>
              Video Clipper App
            </Typography>
          </Toolbar>
        </AppBar>

        <main className={classes.content}>
          <VideoPlayer source="https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4" />
          <Timeline />
        </main>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}>
          <div className={classes.toolbar} />
          <MediaControlCard />
          <SearchBar
            id="search-input"
            placeholder="Search by Tag"
            value={searchValue}
            onChange={this.search}
          />
          <Divider />
          <ClipList />
          <FloatingActionButton />
        </Drawer>
      </HotKeys>
    );
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { clipHasFinished, toPrevVideo, toNextVideo } = state.playbackReducer;
  const { activeClip, clips, clipsIdx, tagFilter } = state.clipReducer;

  return {
    toPrevVideo,
    toNextVideo,
    clipHasFinished,
    activeClip,
    clips,
    clipsIdx,
    tagFilter
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...playbackActions, ...clipActions }, dispatch);
}

let DrawerWrap = withStyles(styles)(ClippedDrawer);

DrawerWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerWrap);

export default DrawerWrap;
