import { combineReducers } from "redux";
import ChartDataReducer from "./chartDataReducer";
import SettingsReducer from "./settingsReducer";
import VibrateLoginReducer from "./vibrateLoginReducer";
import UploadedDataReducer from "./uploadedDataReducer";
import UserReducer from "./userReducer";
import webSocketreducer from "./webSocketReducer";

export const RootReducer = combineReducers({
    chartData: ChartDataReducer,
    settings: SettingsReducer,
    isVibrate: VibrateLoginReducer,
    userDetails: UserReducer,
    uploadedData: UploadedDataReducer,
    websocket: webSocketreducer
});

export type RootState = ReturnType<typeof RootReducer>