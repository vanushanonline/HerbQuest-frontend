import axios from "axios";

//const baseURL = 'https://herbquest.onrender.com/'
const baseURL = 'https://a7f6-2402-4000-2181-9af2-9c2-8976-7ad4-a04e.ngrok-free.app/'
const API = axios.create({ baseURL });

API.interceptors.request.use(
    async config => {
        const newToken = await refreshToken();
        config.headers.Authorization = `${newToken.token_type} ${newToken.access_token}`;
        config.headers["ngrok-skip-browser-warning"] = true
        config.withCredentials = true;  
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const refreshToken = async () => {
    try {
        const response = await API.get('token');
        return response.data
    } catch (error) {
        console.error('Failed to refresh token', error);
        throw error;
    }
}


export const send_blob = async (send_data) => {
    try {
        const response = await API.post(
            `process`,
            send_data
        );
        return response.data;
    } catch (e) {
        throw e;
    }
};


export const register = async (send_data) => {
    try {
        const response = await API.post(`register`, send_data);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const login = async (send_data) => {
    try {
        const response = await API.post(`login`, send_data);
        return response.data;
    } catch (e) {
        throw e;
    }
};


