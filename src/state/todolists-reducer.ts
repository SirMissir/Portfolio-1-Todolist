import {TodoListType} from "../App"

export  const todolistsReducer=(state:TodoListType[ ],action:any):TodoListType[]=>{
    switch (action.type) {
        case 'XXX':{
            return state
        }
        default: return state
    }
}