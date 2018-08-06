const createPopper = (openCreate) => ({
  type: "TOGGLE_NEW_CLIP_POPPER",
  payload: {
    openCreate
  }
})

const editPopper = (openEdit) => ({
  type: "TOGGLE_EDIT_CLIP_POPPER",
  payload: {
    openEdit
  }
})

const tagPopper = (openTags) => ({
  type: "TOGGLE_TAGS_POPPER",
  payload: {
    openTags
  }
})

const executeFilter = (tagFilter) => ({
  type: "EXECUTE_TAG_FILTER",
  payload: {
    tagFilter
  }
})

const loadTags = (editableTags) => ({
  type: 'LOAD_TAGS',
  payload: {
    editableTags
  }
})

const loadClip = (activeClip, clipsIdx) => ({
  type: 'LOAD_CLIP',
  payload: {
    activeClip,
    clipsIdx
  }
})

const loadEditableClip = (editableClip) => ({
  type: 'LOAD_EDITABLE_CLIP',
  payload: {
    editableClip
  }
})

const addClip = (clips) => ({
  type: 'ADD_CLIP',
  payload: {
    clips
  }
})

const removeClip = (clips) => ({
  type: 'REMOVE_CLIP',
  payload: {
    clips
  }
})

const editClip = (clips) => ({
  type: 'EDIT_CLIP',
  payload: {
    clips
  }
})

const addTag = (clips) => ({
  type: 'ADD_TAG',
  payload: {
    clips
  }
})

const toggleAutoplay = (autoplay) => ({
  type: 'TOGGLE_AUTOPLAY',
  payload: {
    autoplay
  }
})

export {
  loadClip,
  loadTags,
  loadEditableClip,
  addClip,
  editClip,
  tagPopper,
  removeClip,
  addTag,
  createPopper,
  editPopper,
  toggleAutoplay,
  executeFilter
}