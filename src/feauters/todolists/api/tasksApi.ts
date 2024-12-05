import {GetTasksResponse, UpdateTaskModel,} from "./tasksApi.types";
import {instance} from "../../../common/instance/instance"
import {BaseResponse, DomainTask} from "../../../common/types/type";

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(task: DomainTask, model: UpdateTaskModel) {
        return instance.put<BaseResponse<{ item: DomainTask }>>(
            `todo-lists/${task.todoListId}/tasks/${task.id}`, model)
    }
}