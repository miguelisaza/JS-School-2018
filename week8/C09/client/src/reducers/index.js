import {
    combineReducers
} from 'redux';

import userReducer from './userReducer';
import bookReducer from './bookReducer';
import reservationReducer from './reservationReducer'

export default combineReducers({
    userReducer,
    bookReducer,
    reservationReducer,
});