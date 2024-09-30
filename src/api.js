import axios from "axios";

//const baseURL = 'https://herbquest.onrender.com/'
const baseURL = 'https://8154-2402-4000-b1c3-7fc1-8dde-d9aa-3e71-d6c5.ngrok-free.app/'
//const baseURL = 'http://127.0.0.1:8000/'
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
        const response = await axios.get(baseURL + 'token', {
            withCredentials: true,
            headers: {
                'ngrok-skip-browser-warning':true
            }
        });
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


