import {DomainTask} from "../../../common/types/type";
import {TaskPriority, TaskStatus} from "../../../common/enums/enums";

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}
export type UpdateTaskModel = {
    title: string
    description: string
    completed: boolean
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
}


