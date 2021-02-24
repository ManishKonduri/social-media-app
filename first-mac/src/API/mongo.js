import React from 'react';
import Axios from 'axios';
import axios from 'axios';

export const userRegistration = async (userData) => {
    const resp = async () => {
        const data = await axios.post('http://localhost:4000/', userData);
        return data;
    }
    return await resp();

}

export const userLogin = async (userData) => {
    const resp = async () => {
        const data = await axios.post("http://localhost:4000/login", userData);
        return data;
    }
    return await resp();
}

export const userUploadImg = async (userData) => {
    const resp = async () => {
        const data = await axios.post("http://localhost:4000/home", userData);
        return data;
    }
    return await resp();
}

export const allUserImages = async () => {
    const resp = async () => {
        const data = await axios.get("http://localhost:4000/imgs");
        return data;
    }
    return await resp();
}

export const likesUpload = async (userData) => {
    const resp = async() => {
        const data = await axios.post("http://localhost:4000/likes", userData);
        return data;
    }
    return await resp();
}