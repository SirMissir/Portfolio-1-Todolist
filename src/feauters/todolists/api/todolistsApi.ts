import axios from "axios";
import {CreateTodolistResponse, DeleteTodolistResponse, Todolist, UpdateTodolistResponse} from "./todolistsApi.types";

const settings = {
    withCredentials: true,
    headers: {
        Authorization: 'Bearer ',
        "API-KEY": ""
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})


export const todolistsApi = {
    getTodolists() {
        return instance.get<Todolist[]>('todo-lists')

    },
    createTodolists(title: string) {
        return instance.post<CreateTodolistResponse>('todo-lists', {title: title})
    },

    updateTodolist(payload: { id: string; title: string }) {
        const {title, id} = payload
        return instance
            .put<UpdateTodolistResponse>(
                `todo-lists/${id}`,
                {title},
            )
    },
    removeTodolist(id: string) {
        return instance
            .delete<DeleteTodolistResponse>(
                `todo-lists/${id}`)
    },
}