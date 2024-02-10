import {TodoListType} from "../App"

export  const todolistsReducer=(state:TodoListType[], action:todolistReducerType):TodoListType[]=>{
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            // setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
            // delete tasks[todoListId]
            return state.filter(el=>el.id!==action.payload.id)
        }
        default: return state
    }
}
type todolistReducerType=removeTodoListACType
type removeTodoListACType=ReturnType<typeof removeTodolistAC>
export const removeTodolistAC =(id:string)=>{
    return{
        type: 'REMOVE-TODOLIST',
        payload:{id}
    }as const
}