import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"


function App(): JSX.Element {
    console.log(v1())
    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML & CSS", isDone: false},
        {id: v1(), title: "Sass & SCSS", isDone: false},
        {id: v1(), title: "ES6 & TS", isDone: false},
        {id: v1(), title: "ES7 & TS", isDone: true},
    ])

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(), title:title, isDone:false
        }
        setTasks([newTask,...tasks])
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
        // console.log(tasks)
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean) =>{
        setTasks(tasks.map(t => t.id === taskId ? {...t,isDone: newIsDone} : t))
    }

    const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

    const changeTodolistFilter = (filter:FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForRender: Array<TaskType> = []
    if (filter === "all") {
        tasksForRender = tasks
    }
    if (filter === "active") {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }


    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasksForRender}
                filter={filter}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
            {/*<TodoList title={ "What to buy"} tasks={tasks}/>*/}
            {/*<TodoList title={ "What to read"}/>*/}
        </div>
    );
}

export default App;
