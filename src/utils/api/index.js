import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const postRegisterUser = async (data) => {
    return axios.post(`${BASE_URL}/api/register`, data).then((res) => res.data);
};

export const postLoginUser = async (data) => {
    return axios.post(`${BASE_URL}/api/login`, data).then((res) => res.data);
};

export const getProtected = async (token) => {
    return axios.get(`${BASE_URL}/api/protected`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getAllLinks = async (token) => {
    return axios.get(`${BASE_URL}/api/listAllLink`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
