import {FilterValuesType, TaskStateType, TaskType} from "../App"
import {v1} from "uuid";
import {todolistReducerType} from "./todolists-reducer";

export  const tasksReducer=(state:TaskStateType, action:tasksReducerType):TaskStateType=>{
    switch (action.type) {
        case 'REMOVE-TASK':{
            // setTasks({...tasks, [todoListId]: tasks[todoListId].filter((task) => task.id !== taskId)})
            return {...state, [action.payload.todolistId]:state[action.payload.todolistId].filter(t => t.id !==action.payload.taskId)}
        }
        case 'ADD-TASK': {
            const newTask: TaskType = {id: action.payload.todolistId, title:action.payload.title, isDone:false}
            // setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
            return {...state,
                [action.payload.todolistId]:[newTask,...state[action.payload.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state,
                [action.payload.todolistId]:state[action.payload.todolistId].map(el => el.id === action.payload.id ? {...el,isDone:action.payload.isDone}:el)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state,
                [action.payload.todolistId]:state[action.payload.todolistId].map(el => el.id === action.payload.id ? {...el,title:action.payload.title}:el)
            }
        }
        case 'ADD-TODOLIST':{
            return {
                ...state,
                [action.payload.feedId]:[]
            }
        }
        case 'REMOVE-TODOLIST':{
                let copyState = {...state}
                delete copyState[action.payload.id]
                return copyState
        }
        default: return state
    }
}
type tasksReducerType=removeTasksACType|addTaskACType|changeTaskStatusACType|changeTaskTitleACType|todolistReducerType

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

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC =(id:string,isDone:boolean,todolistId:string)=>{
    return {
        type:'CHANGE-TASK-STATUS',
        payload:{id,isDone,todolistId}
    }as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC =(id:string,title:string,todolistId:string)=>{
    return {
        type:'CHANGE-TASK-TITLE',
        payload:{id,title,todolistId}
    }as const
}
//
// type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
// export const changeTodolistFilterAC =(filter:FilterValuesType,id:string)=> {
//     return {
//         type: 'CHANGE-TODOLIST-FILTER',
//         payload: {id, filter}
//     } as const
// }


