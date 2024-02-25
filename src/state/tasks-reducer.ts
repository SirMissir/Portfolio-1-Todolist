import {FilterValuesType, TaskStateType} from "../App"
import {v1} from "uuid";

export  const tasksReducer=(state:TaskStateType, action:tasksReducerType):TaskStateType=>{
    switch (action.type) {
        case 'REMOVE-TASK':{
            // setTasks({...tasks, [todoListId]: tasks[todoListId].filter((task) => task.id !== taskId)})
            return {...state, [action.payload.todolistId]:state[action.payload.todolistId].filter(t => t.id !==action.payload.taskId)}
        }
        // case '': {
        //
        //     return state
        // }
        // case '': {
        //
        //     return state
        // }
        // case '': {
        //     return state
        // }
        default: return state
    }
}
type tasksReducerType=removeTasksACType

type removeTasksACType=ReturnType<typeof removeTaskAC>
export const removeTaskAC =(taskId:string,todolistId:string)=>{
    return{
        type: 'REMOVE-TASK',
        payload:{todolistId,taskId}
    }as const
}

// type addTodoListACType = ReturnType<typeof addTodoListAC>
// export const addTodoListAC =(title:string)=>{
//     return {
//         type:'ADD-TODOLIST',
//         payload:{title}
//     } as const
// }
//
// type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
// export const changeTodolistTitleAC =(id:string,title:string)=>{
//     return {
//         type:'CHANGE-TODOLIST-TITLE',
//         payload:{id,title}
//     }as const
// }
//
// type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
// export const changeTodolistFilterAC =(filter:FilterValuesType,id:string)=> {
//     return {
//         type: 'CHANGE-TODOLIST-FILTER',
//         payload: {id, filter}
//     } as const
// }