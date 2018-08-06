const attachVideoToControls = (video) => ({
    type: 'ATTACH_VIDEO_TO_CONTROLS',
    payload: {
        video
    }
})

const convertPlayPauseButton = (isPlaying) => ({
    type: 'PLAY_PAUSE_TRIGGER',
    payload: {
        isPlaying
    }
})

const startCountdownToNextClip = () => ({
    type: 'START_COUNTDOWN_TO_NEXT_CLIP',
})

const resetCountdownToNextClip = () => ({
    type: 'RESET_COUNTDOWN_TO_NEXT_CLIP'
})

const playNextVideo = (toNextVideo) => ({
    type: 'PLAY_NEXT_VIDEO_TOGGLE',
    payload: {
        toNextVideo
    }
})

const playPrevVideo = (toPrevVideo) => ({
    type: 'PLAY_PREVIOUS_VIDEO_TOGGLE',
    payload: {
        toPrevVideo
    }
})

const nextVideoKeyPress = () => ({
    type: 'NEXT_VIDEO_KEYPRESS',
})

const previousVideoKeyPress = () => ({
    type: 'PREVIOUS_VIDEO_KEYPRESS',
})

const resetKeyEvent = () => ({
    type: 'RESET_KEY_EVENT'
})


export {
    attachVideoToControls,
    convertPlayPauseButton,
    startCountdownToNextClip,
    resetCountdownToNextClip,
    playNextVideo,
    playPrevVideo,
    nextVideoKeyPress,
    previousVideoKeyPress,
    resetKeyEvent,
}