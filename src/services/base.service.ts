import axios, { AxiosError, AxiosInstance } from "axios";
import store from "../redux/store";
import { logout } from "../redux/Reducer/userReducer";
import { RootState } from "../redux/Reducer";

export class BaseService {
    httpClient: AxiosInstance;
    httpsClient: AxiosInstance;
    setInterceptors: (_: AxiosInstance) => void

    constructor() {

        this.httpClient = axios.create({
            baseURL: process.env.EXPO_PUBLIC_DREAMFYER_URL,
        });

        this.httpsClient = axios.create({
            baseURL: process.env.EXPO_PUBLIC_DREAMFYER_URL,
        })

        this.setInterceptors = (instance: AxiosInstance) => {
            instance.interceptors.request.use(
                async config => {
                    const authToken = (store?.getState() as RootState)?.userDetails?.authToken;
                    config.headers['Authorization'] = `Bearer ${authToken}`;
                    return config;
                },
                (error: AxiosError) => Promise.reject(error),
            );

            instance.interceptors.response.use(
                response => {
                    return response;
                },
                async error => {
                    if (error?.response?.status === 401 || error?.response?.status === 403) {
                        store.dispatch(logout());
                    }
                    return Promise.reject(error);
                },
            );
        };

        this.setInterceptors(this.httpsClient)
        this.setInterceptors(this.httpClient)
    }
}
