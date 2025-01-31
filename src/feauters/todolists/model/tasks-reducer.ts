import {v1} from "uuid";
import {addTodoListACType, removeTodoListACType, todolistReducerType} from "./todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: tasksReducerType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            const newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.title
                } : el)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.feedId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }
        default:
            return state
    }
}

// Action creators
export const removeTaskAC = (payload:{taskId: string, todolistId: string}) => {
    return {
        type: 'REMOVE-TASK',
        payload
    } as const
}
export const addTaskAC = (payload: { title: string, todolistId: string }) => {
    return {
        type: 'ADD-TASK',
        payload
    } as const
}
export const changeTaskStatusAC = (payload:{taskId: string, isDone: boolean, todolistId: string}) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload
    } as const
}
export const changeTaskTitleAC = (payload:{taskId: string, title: string, todolistId: string}) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload
    } as const
}

// Actions types
export type removeTasksACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type tasksReducerType =
    removeTasksACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | todolistReducerType
    | addTodoListACType
    | removeTodoListACType




