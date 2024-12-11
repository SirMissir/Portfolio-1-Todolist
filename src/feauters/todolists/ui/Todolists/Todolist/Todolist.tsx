import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {addTaskAC} from "../../../model/tasks-reducer";


type Props = {
    todolist: TodolistType
}

export const Todolist = ({todolist}: Props) => {

    const dispatch = useAppDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC({title, todolistId: todolist.id}))
    }

    return (
        <>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTask}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </>
    )
}