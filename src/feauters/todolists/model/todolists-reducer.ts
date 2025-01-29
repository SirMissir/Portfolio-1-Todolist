import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

const initialState: TodolistType[] = []

export const todolistsReducer = (state = initialState, action: todolistReducerType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const newTodo: TodolistType = {
                id: action.payload.feedId,
                title: action.payload.title,
                filter: "all"
            };
            return [...state, newTodo]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
}

// Action creators
export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {id}} as const
};

export const addTodoListAC = (title: string) => {
    const feedId = v1();
    return {type: 'ADD-TODOLIST', payload: {title, feedId}} as const
};

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload} as const
};

export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValuesType }) => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload} as const
};

// Actions types
export type removeTodoListACType = ReturnType<typeof removeTodolistAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export type todolistReducerType = removeTodoListACType
    | addTodoListACType
    | changeTodolistTitleACType
    | changeTodolistFilterACType