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

export type BaseResponse<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: D
}