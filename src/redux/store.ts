import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootReducer } from './Reducer'; // Your root reducer

const persistConfig = {
    key: 'pocketBud',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // This is required to ignore non-serializable actions like those from redux-persist
        }),
});

export const persistor = persistStore(store);
export default store;