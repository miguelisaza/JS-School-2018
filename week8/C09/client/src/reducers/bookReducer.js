const initialState = {
  bookshelf: [],
  location: "",
  filterText: "",
  shape: "grid"
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_BOOKSHELF':
      {
        const {
          bookshelf
        } = action.payload;
        return {
          ...state,
          bookshelf
        }
      }
    case 'LOCATION_FILTER':
      {
        const {
          location
        } = action.payload;
        return {
          ...state,
          location
        }
      }
    case 'TEXT_FILTER':
      {
        const {
          filterText
        } = action.payload;
        return {
          ...state,
          filterText
        }
      }

    case 'CHANGE_DISPLAY_SHAPE':
      {
        const {
          shape
        } = action.payload;
        return {
          ...state,
          shape
        }
      }

    default:
      return state;
  }

}