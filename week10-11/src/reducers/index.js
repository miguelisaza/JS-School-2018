import {
    combineReducers
} from 'redux';


import playbackReducer from './playbackReducer'
import clipReducer from './clipReducer'

export default combineReducers({
    playbackReducer,
    clipReducer
});