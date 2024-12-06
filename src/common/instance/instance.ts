import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        Authorization: 'Bearer ${process.env.REACT_APP_AUTH_TOKEN}',
        "API-KEY": process.env.REACT_APP_API_KEY,
    }
}

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    ...settings
})