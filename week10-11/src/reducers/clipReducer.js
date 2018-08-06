const initialState = {
  clips: [],
  numOfClips: 0,
  activeClip: {
    clipName: "Main Video",
    startTime: "00",
    endTime: "52",
    clipsIdx: 0,
    tags: []
  },
  editableClip: {
    clipName: "",
    startTime: "",
    endTime: "",
    tags: []
  },
  editableTags: [],
  tagFilter: "",
  openCreate: false,
  openEdit: false,
  openTags: false,
  autoplay: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_NEW_CLIP_POPPER':
      {
        const {
          openCreate
        } = action.payload;
        return {
          ...state,
          openCreate
        }
      }

    case 'TOGGLE_EDIT_CLIP_POPPER':
      {
        const {
          openEdit
        } = action.payload
        return {
          ...state,
          openEdit
        }
      }

    case 'TOGGLE_TAGS_POPPER':
      {
        const {
          openTags
        } = action.payload
        return {
          ...state,
          openTags
        }
      }

    case 'LOAD_TAGS':
      {
        const {
          editableTags
        } = action.payload
        return {
          ...state,
          editableTags
        }
      }


    case 'EXECUTE_TAG_FILTER':
      {
        const {
          tagFilter
        } = action.payload

        return {
          ...state,
          tagFilter
        }
      }

    case 'LOAD_CLIP':
      {
        const {
          activeClip,
          clipsIdx
        } = action.payload

        return {
          ...state,
          activeClip,
          clipsIdx
        }
      }

    case 'LOAD_EDITABLE_CLIP':
      {
        const {
          editableClip
        } = action.payload

        return {
          ...state,
          editableClip
        }
      }

    case 'EDIT_CLIP':
      {
        const {
          clips
        } = action.payload

        return {
          ...state,
          clips,
          numOfClips: clips.length
        }
      }

    case 'ADD_CLIP':
      {
        const {
          clips
        } = action.payload
        return {
          ...state,
          clips,
          numOfClips: clips.length
        }
      }

    case 'REMOVE_CLIP':
      {
        const {
          clips
        } = action.payload
        return {
          ...state,
          clips,
          numOfClips: clips.length
        }
      }

    case 'ADD_TAG':
      {
        const {
          clips
        } = action.payload
        return {
          ...state,
          clips
        }
      }

    case 'TOGGLE_AUTOPLAY':
      {
        const {
          autoplay
        } = action.payload;

        return {
          ...state,
          autoplay
        }
      }
    default:
      return state;

  }
}