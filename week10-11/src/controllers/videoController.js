import {
    store
} from '../store';

const getVideoFromStore = () => {
    const st = store.getState();
    return st.playbackReducer.video
}

const playVideo = () => {
    const video = getVideoFromStore();
    video.play()
    return true;
}

const pauseVideo = () => {
    const video = getVideoFromStore();
    video.pause();
    return true;
}

const getVideoDuration = () => {
    const video = getVideoFromStore();
    return video.duration
}

const getCurrentTime = () => {
    const video = getVideoFromStore();
    return video.currentTime
}

const setCurrentTime = time => {
    const t = parseInt(time, 10)
    const video = getVideoFromStore();
    video.currentTime = t;
    return true;
}

const getCurrentBufferTime = () => {
    const video = getVideoFromStore();
    try {
        return video.buffered.end(0);
    } catch (e) {
        return 0
    }
}

export {
    playVideo,
    pauseVideo,
    getVideoDuration,
    getCurrentTime,
    setCurrentTime,
    getVideoFromStore,
    getCurrentBufferTime,
}