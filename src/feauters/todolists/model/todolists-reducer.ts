import {FilterValuesType, TodoListType} from "../../../app/AppWithRedux"
import {v1} from "uuid";

const initialState:Array<TodoListType> = []

export  const todolistsReducer=(state= initialState, action:todolistReducerType):TodoListType[]=>{
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(el=>el.id!==action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const newTodo: TodoListType = {id: action.payload.feedId, title: action.payload.title, filter: "all"};
            return [...state,newTodo]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.id ?{...el,title:action.payload.title} :el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.id ?{...el,filter:action.payload.filter} :el)
        }
        default: return state
    }
}
export type todolistReducerType=removeTodoListACType | addTodoListACType | changeTodolistTitleACType | changeTodolistFilterACType
export type removeTodoListACType=ReturnType<typeof removeTodolistAC>
export const removeTodolistAC =(id:string)=>{
    return{
        type: 'REMOVE-TODOLIST',
        payload:{id}
    }as const
}

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC =(title:string)=>{
    const feedId = v1();
    return {
        type:'ADD-TODOLIST',
        payload:{title,feedId}
    } as const
}

export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC =(id:string,title:string)=>{
    return {
        type:'CHANGE-TODOLIST-TITLE',
        payload:{id,title}
    }as const
}

export type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC =(filter:FilterValuesType,id:string)=> {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {id, filter}
    } as const
}