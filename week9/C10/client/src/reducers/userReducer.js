const initialState = {
  isLoggedIn: false,
  error: "asd",
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      {
        console.log('reduxLoggedIn!');
        const {
          isLoggedIn,
          token
        } = action.payload
        return {
          ...state,
          isLoggedIn,
          token,
        }
      }
    case 'LOGOUT':
      {
        return {
          ...state,
          isLoggedIn: false,
          token: null,
        }
      }

    case 'LOAD_USER':
      {
        const {
          user
        } = action.payload
        return {
          ...state,
          user
        }
      }

    default:
      return state;
  }

}