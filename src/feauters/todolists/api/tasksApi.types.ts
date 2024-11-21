import axios from "axios";

export type FieldError = {
    error: string
    field: string
}
export type DomainTask = {
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
    completed: boolean
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}
export type CreateTaskResponse = {
    resultCode: number
    messages: string
    data: {
        item: {
            description: string
            title: string
            completed: boolean
            status: number
            priority: number
            startDate: string
            deadline: string
            id: string
            todoListId: string
            order: number
            addedDate: string

        }
    }

}
export type DeleteTaskResponse = {
    resultCode: number
    messages: string
    data: {}
    fieldsErrors: [FieldError]

}
export type UpdateTaskResponse = {
    resultCode: number
    messages: string,
    data: {item: DomainTask}
}
export type UpdateTaskModel = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}


const settings = {
    withCredentials: true,
    headers: {
        Authorization: 'Bearer 86f66b1c-6ffa-4b1b-ab89-5c9793a5c5bf',
        "API-KEY": "ac6ad0ec-ebe5-4c23-bcb3-ac6aff8b99b2"
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId:string, taskId: string) {
        return instance.delete<DeleteTaskResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId:string,title:string){
        return instance.post<CreateTaskResponse>(`todo-lists/${todolistId}/tasks`,{title})
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<UpdateTaskResponse>(
            `todo-lists/${todolistId}/tasks/${taskId}`, { title }
        )}
}
