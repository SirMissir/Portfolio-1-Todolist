import axios from "axios";
import {Todolist} from "./todolistsApi.types";


export const todolistsApi = {
    getTodolists() {
        const promise = axios.get<Todolist[]>(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            {
                headers: {
                    Authorization: 'Bearer ',
                },
            }
        )
        return promise
    },
}