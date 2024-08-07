import {FilterValuesType, TaskStateType, TaskType} from "../AppWithRedux"
import {v1} from "uuid";
import {todolistReducerType} from "./todolists-reducer";

const initialState:TaskStateType = {}

export  const tasksReducer=(state=initialState, action:tasksReducerType):TaskStateType=>{
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
        case 'CHANGE-TASK-STATUS': {
            debugger
            return {...state,
                [action.payload.todolistId]:state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {...el,isDone:action.payload.isDone}:el)
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
        default:
            return state
    }
}
type tasksReducerType=removeTasksACType|addTaskACType|changeTaskStatusACType|changeTaskTitleACType|todolistReducerType|changeTodolistFilterACType

export type removeTasksACType=ReturnType<typeof removeTaskAC>
export const removeTaskAC =(taskId:string,todolistId:string)=>{
    return{
        type: 'REMOVE-TASK',
        payload:{taskId,todolistId,}
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
export const changeTaskStatusAC =(taskId:string,isDone:boolean,todolistId:string)=>{
    return {
        type:'CHANGE-TASK-STATUS',
        payload:{taskId,isDone,todolistId}
    }as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC =(id:string,title:string,todolistId:string)=>{
    return {
        type:'CHANGE-TASK-TITLE',
        payload:{id,title,todolistId}
    }as const
}

type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC =(filter:FilterValuesType,id:string)=> {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {id, filter}
    } as const
}


