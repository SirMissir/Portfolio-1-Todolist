import axios from "axios";
import {CreateTodolistResponse, Todolist, UpdateTodolistResponse} from "./todolistsApi.types";


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
    createTodolists()={
    const promise = axios.post<CreateTodolistResponse>(
        'https://social-network.samuraijs.com/api/1.1/todo-lists',
        {title},
        {
            headers: {
                Authorization: ,
                'API-KEY': ,
            },
        }
    )
}

    updateTodolist(payload: { id: string; title: string }) {
        const { title, id } = payload
        const promise = axios.put<UpdateTodolistResponse>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            { title },
            {
                headers: {
                    Authorization: 'Bearer ',
                    'API-KEY': ',
                },
            }
        )
        return promise
    },
}