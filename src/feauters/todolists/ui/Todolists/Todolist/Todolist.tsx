import {AddItemForms} from "../../../../../common/components/AddItemForm/AddItemForms";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {addTaskAC} from "../../../model/tasks-reducer";
import {TodolistType} from "../../../model/todolists-reducer";
import {FilterTasksButtons} from "./FilterTasksButton/FilterTasksButton";
import {Tasks} from "./Tasks/Tasks";
import {TodolistTitle} from "./TodolistTitle/TodolistsTitle";


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
            <AddItemForms addItem={addTask}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </>
    )
}