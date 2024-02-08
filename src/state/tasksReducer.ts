import {TaskType} from "../TodoList";

export const tasksReducer = (state: TaskType[], action: TsarType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state
        }
        default:
            return state
    }
}
type TsarType = RemoveTaskACType

type RemoveTaskACType = ReturnType <typeof  removeTaskAC>

const removeTaskAC = () =>{
    return {
        type:'REMOVE-TASK'
    } as const
}




// export const ButtonReducer = (state: TaskType[], action: any) => {
//     switch (action.type) {
//         case 'XXX': {
//             return state
//         }
//         default:
//             return state
//     }
// }
// type RemoveTaskACType= ReturnType <typeof  removeTaskAC>
//
// const removeTaskAC = () =>{
//     return {
//         type:'REMOVE-TASK'
//     }
// }