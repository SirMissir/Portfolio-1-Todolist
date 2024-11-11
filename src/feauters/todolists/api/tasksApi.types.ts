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