import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filter:FilterValuesType) => void
    addTask:(title:string) => void
    changeTaskStatus:(taskId: string) => void
}


const TodoList: React.FC<TodoListPropsType> = (props) => {

    const [title,setTitle]= useState<string>("")

    let isAllTasksNotIsDone = true // все не выполнено, change background-color todolist
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"

    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTaskHandler = () => props.removeTask(task.id)
        const changeTaskStatus = () => props.changeTaskStatus(task.id)
        return (
            <li>
                <input
                    onChange={changeTaskStatus}
                    type="checkbox"
                    checked={task.isDone}/>
                <span>{task.title}</span>
                <button
                    onClick={removeTaskHandler}>x
                </button>
            </li>
        )
    })
    const maxTitleLength = 20
    const recommendedTitleLength = 10
    const isAddTaskNotPossible = title.length === 0 || title.length > maxTitleLength


    const addTaskHandler = () => {
        props.addTask(title)
         setTitle("")
     }
    const setLocalTitleHandler = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined
        :(e:KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()


    const longTitleWarningMassage = (title.length > recommendedTitleLength && title.length <= maxTitleLength ) &&
        <div style={{color:"red"}}>Title should be shorter</div>
    const longTitleErrorMassage = title.length > maxTitleLength &&
        <div style={{color:"lightgoldenrodyellow"}}>Title is too long !!!</div>


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
                    />
                    <button
                        disabled={isAddTaskNotPossible}
                        onClick={addTaskHandler} >+</button>
                    {longTitleWarningMassage }
                    {longTitleErrorMassage}

                </div>
                <ul>
                    {todoListItems}
                </ul>
                <div>
                    <button onClick={() => {
                        props.changeTodolistFilter("all")
                    }} >
                        All</button>
                    <button onClick={() => {
                        props.changeTodolistFilter("active")
                    }}>
                        Active</button>
                    <button onClick={() => {
                        props.changeTodolistFilter("completed")
                    }}>
                        Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;