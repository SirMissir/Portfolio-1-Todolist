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
        const promise = instance
            .get<Todolist[]>('todo-lists')
        return promise
    },

    createTodolists(title:string) {
        const promise =  instance
            .post<CreateTodolistResponse>(
                'todo-lists',
                {title: title})
        return promise
    },

    updateTodolist(payload: { id: string; title: string }) {
        const {title, id} = payload
        const promise = instance
            .put<UpdateTodolistResponse>(
            `todo-lists/${id}`,
            {title},
        )
        return promise
    },
    removeTodolist(id:string) {
        const promise= instance
            .delete<DeleteTodolistResponse>(
                `todo-lists/${id}`)
        return promise;
    },
}