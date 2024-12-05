import {DomainTask} from "../../../common/types/type";

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
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


