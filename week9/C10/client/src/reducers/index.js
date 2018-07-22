import {
    combineReducers
} from 'redux';

import {
    reducer as toastr
} from 'react-redux-toastr';

import userReducer from './userReducer';
import bookReducer from './bookReducer';
import reservationReducer from './reservationReducer'

export default combineReducers({
    userReducer,
    bookReducer,
    reservationReducer,
    toastr,
});