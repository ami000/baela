import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { RootReducer } from './Reducer'; // Your root reducer

// const persistConfig = {
//     key: 'pocketBud',
//     storage,
// };

// const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // This is required to ignore non-serializable actions like those from redux-persist
        }),
});

export const persistor = persistStore(store);
export default store;