import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        Authorization: 'Bearer 86f66b1c-6ffa-4b1b-ab89-5c9793a5c5bf',
        "API-KEY": "ac6ad0ec-ebe5-4c23-bcb3-ac6aff8b99b2"
    }
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})