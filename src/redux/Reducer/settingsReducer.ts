import { createSlice } from '@reduxjs/toolkit';

// const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

const initialState = {
    darkMode: false
};

const SettingsReducer = createSlice({
    name: 'settingsReducer',
    initialState,
    reducers: {
        settings(state: any, payload) {
            state.darkMode = payload?.payload?.darkMode
            state.isLoading = payload?.payload?.isLoading
        }
    }
});

export const { settings } = SettingsReducer.actions;
export default SettingsReducer.reducer;
