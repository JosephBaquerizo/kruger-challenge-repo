import { configureStore } from '@reduxjs/toolkit';
//import storage from 'redux-persist/lib/storage';
import storage from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['modal', 'selectedEmployee']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);