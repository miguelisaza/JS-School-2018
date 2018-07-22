import {
    createBrowserHistory
} from 'history'

import {
    createStore,
    applyMiddleware
} from 'redux';

import {
    connectRouter,
    routerMiddleware
} from 'connected-react-router'

import {
    composeWithDevTools
} from 'redux-devtools-extension';

import {
    persistStore,
    persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducers'


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['bookReducer', 'reservationReducer', 'toastr']
}

const history = createBrowserHistory()
const persistedReducer = persistReducer(persistConfig, rootReducer)
const routedPersistedReducer = connectRouter(history)(persistedReducer)
const initialState = {};

const store = createStore(routedPersistedReducer, initialState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history)), ));

const persistor = persistStore(store)
export {
    store,
    persistor,
    history
};