import axios from "axios";
import {CreateTodolistResponse, DeleteTodolistResponse, Todolist, UpdateTodolistResponse} from "./todolistsApi.types";

const settings = {
    withCredentials: true,
    headers: {
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
        const promise = axios.put<UpdateTodolistResponse>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title},
            {
                headers: {
                    Authorization: 'Bearer ',
                    'API-KEY': ',
                },
            }
        )
        return promise
    },
    removeTodolist(id:string) {
        axios
            .delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
                headers: {
                    Authorization: ,
                    'API-KEY': ,
                },
            })
        return promise
    },
}