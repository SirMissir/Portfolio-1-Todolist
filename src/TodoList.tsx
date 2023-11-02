import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeTodolistFilter: (filter:FilterValuesType, todoListId: string) => void
    addTask:(title:string, todoListId: string) => void
    changeTaskStatus:(taskId: string, newIsDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodolist: (todoListId: string) => void
}


const TodoList: React.FC<TodoListPropsType> = (props) => {

    const [title,setTitle]= useState<string>("")
    const [error,setError]= useState<boolean>(false)

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
        return (
            <li>
                <input
                    onChange={changeTaskStatus}
                    type="checkbox"
                    checked={task.isDone}/>
                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                <button
                    onClick={removeTaskHandler}>x
                </button>
            </li>
        )
    })
    const maxTitleLength = 20
    const recommendedTitleLength = 10
    const isAddTaskNotPossible = title.length === 0 || title.length > maxTitleLength || error


    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(trimmedTitle, props.todoListId)
        } else {
            setError(true)
        }
        setTitle("")
     }
    const setLocalTitleHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined
        :(e:KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()


    const longTitleWarningMassage = (title.length > recommendedTitleLength && title.length <= maxTitleLength ) &&
        <div style={{color:"red"}}>Title should be shorter</div>
    const longTitleErrorMassage = title.length > maxTitleLength &&
        <div style={{color:"red"}}>Title is too long !!!</div>
    const errorMessage = error && <div style={{color: "red"}}>Title is hard required</div>


    return (
        <div>
            <div className={todoClasses}>
                <h3>{props.title}</h3>
                <div>
                    <input
                        placeholder="Enter task title,please"
                        value={title}
                        onChange={setLocalTitleHandler}
                        onKeyDown = {onKeyDownAddTaskHandler}
                        className={error ? "input-error" : ""}
                    />
                    <button
                        disabled={isAddTaskNotPossible}
                        onClick={addTaskHandler} >+</button>
                    {longTitleWarningMassage }
                    {longTitleErrorMassage}
                    {errorMessage}

                </div>
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