import { configureStore, combineReducers } from '@reduxjs/toolkit';
import appReducer from './Reducer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    persistStore, persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

// khởi tạo rootReducer, kết hợp tất cả các reducer
const rootReducer = combineReducers({
    app: appReducer,
});

// khởi tạo persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// khởi tạo store, quản lý state
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);


