import axios from "axios";
import {CreateTodolistResponse, DeleteTodolistResponse, Todolist, UpdateTodolistResponse} from "./todolistsApi.types";


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

    createTodolists(title:string) {
        const promise = axios.post<CreateTodolistResponse>(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title},
            {
                headers: {
                    Authorization:,
                    'API-KEY':,
                },
            }
        )
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