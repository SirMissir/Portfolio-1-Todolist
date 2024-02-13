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
        default: return state
    }
}
type todolistReducerType=removeTodoListACType | addTodoListACType
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