import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const postRegisterUser = (data) => {
    return axios.post(`${BASE_URL}/api/register`, data).then((res) => res.data);
};

export const postLoginUser = (data) => {
    return axios.post(`${BASE_URL}/api/login`, data).then((res) => res.data);
};

export const getProtected = (token) => {
    return axios.get(`${BASE_URL}/api/protected`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
