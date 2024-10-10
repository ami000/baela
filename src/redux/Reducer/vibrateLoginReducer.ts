import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVibrate: false
};

const VibrateLoginReducer = createSlice({
    name: 'vibrateLoginReducer',
    initialState,
    reducers: {
        isVibrate(state: any, payload) {
            state.isVibrate = payload
        }
    }
});

export const { isVibrate } = VibrateLoginReducer.actions;
export default VibrateLoginReducer.reducer;
