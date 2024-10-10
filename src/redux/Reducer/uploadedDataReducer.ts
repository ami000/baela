import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uploadedData: []
};

const UploadedDataReducer = createSlice({
    name: 'uploadedDataReducer',
    initialState,
    reducers: {
        uploadedData(state: any, payload) {
            state.uploadedData = payload?.payload?.payload || []
            state.dbData = payload?.payload?.dbData || []
        }
    }
});

export const { uploadedData } = UploadedDataReducer.actions;
export default UploadedDataReducer.reducer;
