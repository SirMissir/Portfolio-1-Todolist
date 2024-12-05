import  {Todolist} from "./todolistsApi.types";
import {BaseResponse} from "../../../common/types/type";
import {instance} from "../../../common/instance/instance"


export const todolistsApi = {
    getTodolists() {
        return instance.get<Todolist[]>('todo-lists')

    },
    createTodolists(title: string) {
        return instance.post<BaseResponse<{ item: Todolist }>>('todo-lists', {title: title})
    },
    updateTodolist(payload: { id: string; title: string }) {
        const {title, id} = payload
        return instance
            .put<BaseResponse>(
                `todo-lists/${id}`,
                {title},
            )
    },
    removeTodolist(id: string) {
        return instance
            .delete<BaseResponse>(
                `todo-lists/${id}`)
    },
}