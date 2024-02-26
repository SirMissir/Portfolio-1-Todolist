import {FilterValuesType, TaskStateType, TaskType} from "../App"
import {v1} from "uuid";

export  const tasksReducer=(state:TaskStateType, action:tasksReducerType):TaskStateType=>{
    switch (action.type) {
        case 'REMOVE-TASK':{
            // setTasks({...tasks, [todoListId]: tasks[todoListId].filter((task) => task.id !== taskId)})
            return {...state, [action.payload.todolistId]:state[action.payload.todolistId].filter(t => t.id !==action.payload.taskId)}
        }
        case 'ADD-TASK': {
            const newTask: TaskType = {id: v1(), title:action.payload.title, isDone:false}
            // setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
            return {...state,
                [action.payload.todolistId]:[newTask,...state[action.payload.todolistId]]}
        }
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
type tasksReducerType=removeTasksACType|addTaskACType

type removeTasksACType=ReturnType<typeof removeTaskAC>
export const removeTaskAC =(taskId:string,todolistId:string)=>{
    return{
        type: 'REMOVE-TASK',
        payload:{todolistId,taskId}
    }as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC =(title:string,todolistId:string)=>{
    return {
        type:'ADD-TASK',
        payload:{title,todolistId}
    } as const
}
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