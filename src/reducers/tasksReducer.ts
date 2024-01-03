import {TaskType} from "../TodoList";

export const tasksReducer = (state: TaskType[], action: any) => {
    switch (action.type) {
        case 'XXX': {
            return state
        }
        default:
            return state
    }
}
type RemoveTaskACType= ReturnType <typeof  removeTaskAC>

const removeTaskAC = () =>{
    return {
        type:'REMOVE-TASK'
    }
}




export const ButtonReducer = (state: TaskType[], action: any) => {
    switch (action.type) {
        case 'XXX': {
            return state
        }
        default:
            return state
    }
}
type RemoveTaskACType= ReturnType <typeof  removeTaskAC>

const removeTaskAC = () =>{
    return {
        type:'REMOVE-TASK'
    }
}