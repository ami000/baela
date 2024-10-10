// src/store/websocketSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WebSocketState {
    connected: boolean;
    messages: any[];
}

const initialState: WebSocketState = {
    connected: false,
    messages: [],
};

const websocketSlice = createSlice({
    name: "websocket",
    initialState,
    reducers: {
        setConnected(state, action: PayloadAction<boolean>) {
            state.connected = action.payload;
        },
        addMessage(state, action: PayloadAction<any>) {
            state.messages.push(action.payload);
        },
        clearMessages(state) {
            state.messages = [];
        },
    },
});

export const { setConnected, addMessage, clearMessages } = websocketSlice.actions;
export default websocketSlice.reducer;
