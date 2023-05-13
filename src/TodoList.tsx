import React from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeTodolistFilter: (filter:FilterValuesType) => void
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
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button
                    onClick={() => {
                    props.removeTask(task.id)
                }}>x
                </button>
            </li>
        )
    })

    return (
        <div>
            <div className={todoClasses}>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
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