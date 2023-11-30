import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import AddItemForms from "./AddItemForms";
import EditableSpan from "./EditableSpan";



type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string)=>void
    removeTask: (taskId: string, todoListId: string) => void
    changeTodolistFilter: (filter:FilterValuesType, todoListId: string) => void
    changeTaskStatus:(taskId: string, newIsDone: boolean, todoListId: string) => void
    changeTodolistTitle: (newTitle:string, todoListId: string) =>void
    addTask:(title:string, todoListId: string) => void
    removeTodolist: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone:boolean
}

const TodoList: React.FC<TodoListPropsType> = (props) => {

    let isAllTasksNotIsDone = true // все не выполнено, change background-color todolist
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"

    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
        const changeTaskTitle = ( newTitle:string) => props.changeTaskTitle(task.id, newTitle, props.todoListId)
        return (
            <li key={task.id}>
                <input
                    onChange={changeTaskStatus}
                    type="checkbox"
                    checked={task.isDone}/>
                <EditableSpan
                    title={task.title}
                    changeTitle={changeTaskTitle}
                    classes={task.isDone ? "task-done" : "task"}/>
                <button
                    onClick={removeTaskHandler}>x
                </button>
            </li>
        )
    })

    const addTask = (title:string) => {
            props.addTask(title, props.todoListId)
     }
    const removeTodolist = () =>props.removeTodolist(props.todoListId)
    const changeTodolistTitle =( newTitle:string) => props.changeTodolistTitle(newTitle,props.todoListId)
    return (
        <div>
            <div className={todoClasses}>
                <h3>
                    <EditableSpan title={props.title}  changeTitle={changeTodolistTitle}/>
                    <button onClick={removeTodolist}>x</button>
                </h3>
                <AddItemForms addItem={addTask} recommendedTitleLength={10} maxTitleLength={20}/>
                <ul>
                    {todoListItems}
                </ul>
                <div>
                    <button className={props.filter === "all" ? "btn-active" : ""} onClick={() => {
                        props.changeTodolistFilter("all", props.todoListId)
                    }} >
                        All</button>
                    <button className={props.filter === "active" ? "btn-active" : ""} onClick={() => {
                        props.changeTodolistFilter("active", props.todoListId)
                    }}>
                        Active</button>
                    <button className={props.filter === "completed" ? "btn-active" : ""} onClick={() => {
                        props.changeTodolistFilter("completed", props.todoListId)
                    }}>
                        Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;