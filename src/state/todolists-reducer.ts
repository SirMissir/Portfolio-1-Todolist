import {TodoListType} from "../App"
import {v1} from "uuid";

export  const todolistsReducer=(state:TodoListType[], action:todolistReducerType):TodoListType[]=>{
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            // setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
            // delete tasks[todoListId]
            return state.filter(el=>el.id!==action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const newTodo: TodoListType = {id: v1(), title: action.payload.title, filter: "all"};
            // setTodoLists([...todoLists,newTodo])
            // setTasks({...tasks,[newTodo.id]:[]})}
            return [...state,newTodo]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            // setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title:newTitle} : tl))
            return state.map(el => el.id === action.payload.id ?{...el,title:action.payload.title} :el)
        }
        default: return state
    }
}
type todolistReducerType=removeTodoListACType | addTodoListACType | changeTodolistTitleACType
type removeTodoListACType=ReturnType<typeof removeTodolistAC>
export const removeTodolistAC =(id:string)=>{
    return{
        type: 'REMOVE-TODOLIST',
        payload:{id}
    }as const
}

type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC =(title:string)=>{
    return {
        type:'ADD-TODOLIST',
        payload:{title}
    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC =(id:string,title:string)=>{
    return {
        type:'CHANGE-TODOLIST-TITLE',
        payload:{id,title}
    }as const
}