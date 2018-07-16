const initialState = {
  showModal: false,
  bookInModal: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_RESERVATION_MODAL':
      {
        return {
          ...state,
          showModal: true
        }
      }
    case 'CLOSE_RESERVATION_MODAL':
      {
        return {
          ...state,
          showModal: false
        }
      }

    case 'LOAD_BOOK_IN_MODAL':
      {
        const {
          bookInModal
        } = action.payload;
        return {
          ...state,
          bookInModal

        }
      }
    default:
      return state;

  }

}