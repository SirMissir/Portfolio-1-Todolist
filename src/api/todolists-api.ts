import axios from "axios";
import {number, string} from "prop-types";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "ac6ad0ec-ebe5-4c23-bcb3-ac6aff8b99b2"
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    ...settings
})

type getTodolistsType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type ResponseType<D> = {
    resultCode: number,
    messages: Array<string>,
    data: D
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}
type DomainTask = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


export const todolistsApi = {
    getTodolists() {
        const promise = instance
            .get<Array<getTodolistsType>>('todo-lists/')
        return promise;
    },
    createTodolists(title: string) {
        const promise = instance
            .post<ResponseType<{ item: getTodolistsType }>>(
                '',
                {title: title})
        return promise;
    },
    deleteTodolists(id: string) {

        const promise =
            instance
                .delete<ResponseType<{}>>(
                    `todo-lists/${id}`)
        return promise;
    },
    updateTodolists(id: string, title: string) {

        const promise = instance
            .put<ResponseType<{}>>(
                `todo-lists/${id}`,
                {title: title})
        return promise;
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    }

}