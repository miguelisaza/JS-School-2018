const initialState = {
  video: null,
  isPlaying: false,
  clipHasFinished: false,
  toNextVideo: false,
  toPrevVideo: false,
  keyEvent: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ATTACH_VIDEO_TO_CONTROLS':
      {
        const {
          video
        } = action.payload
        return {
          ...state,
          video
        }
      }

    case 'PLAY_PAUSE_TRIGGER':
      {
        const {
          isPlaying
        } = action.payload
        return {
          ...state,
          isPlaying,
        }
      }

    case 'START_COUNTDOWN_TO_NEXT_CLIP':

      return {
        ...state,
        clipHasFinished: true
      }


    case 'RESET_COUNTDOWN_TO_NEXT_CLIP':
      {
        return {
          ...state,
          clipHasFinished: false
        }
      }

    case 'PLAY_NEXT_VIDEO_TOGGLE':
      {
        const {
          toNextVideo
        } = action.payload;
        return {
          ...state,
          toNextVideo

        }
      }

    case 'PLAY_PREVIOUS_VIDEO_TOGGLE':
      {
        const {
          toPrevVideo
        } = action.payload;
        return {
          ...state,
          toPrevVideo
        }
      }

    case 'NEXT_VIDEO_KEYPRESS':
      {
        return {
          ...state,
          toNextVideo: true,
          keyEvent: true,
        }
      }

    case 'PREVIOUS_VIDEO_KEYPRESS':
      {
        return {
          ...state,
          toPrevVideo: true,
          keyEvent: true,
        }
      }

    case 'RESET_KEY_EVENT':
      {
        return {
          ...state,
          keyEvent: false
        }
      }

    default:
      return state;

  }
}