import {
    createStore,
} from 'redux';

import {
    persistStore,
    persistReducer
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

import rootReducer from './reducers'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['clipReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
    stateSanitizer: (state) => state ? { ...state,
        playbackReducer: {
            ...state.playbackReducer,
            video: '<<LONG_BLOB>>'
        }
    } : state
    // actionsBlacklist: ['ATTACH_VIDEO_TO_CONTROLS']
}));

const persistor = persistStore(store)
export {
    store,
    persistor,
};