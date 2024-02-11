import {TodoListType} from "../App"
import {v1} from "uuid";

export  const todolistsReducer=(state:TodoListType[], action:todolistReducerType):TodoListType[]=>{
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            // setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
            // delete tasks[todoListId]
            return state.filter(el=>el.id!==action.payload.id)
        }
        case 'ADD-TODOLIST':{
            // setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
            // delete tasks[todoListId]
            const newTodo: TodoListType ={
                            id: v1(),
                            title:title,
                            filter: "all"
                        }
            return
            {setTodoLists([...todoLists,newTodo])
            setTasks({...tasks,[newTodo.id]:[]})}
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