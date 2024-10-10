import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userDetails: {},
    isAuthenticated: false,
    userName: "",
    authToken: "",
    loginSource: "login",
};

const UserReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        updateUserData(state: any, payload) {
            state.userDetails = { ...(state.userDetails || {}), ...payload.payload }
        },
        userData(state: any, payload) {
            state.userDetails = payload.payload
        },
        login: (state) => {
            state.isAuthenticated = true;
            return state;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.authToken = ""
            state.userDetails = {}
            return state;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
            return state;
        },
        setAuthToken: (state, action) => {
            state.isAuthenticated = true;
            state.authToken = action.payload?.token;
            state.loginSource = action.payload?.source;
            return state;
        },
        setFreedata: (state, action) => {
            state = { ...state, ...action.payload }
            return state;
        },
    }
});

export const { updateUserData, userData, login, logout, setUserName, setAuthToken, setFreedata } = UserReducer.actions;
export default UserReducer.reducer;
