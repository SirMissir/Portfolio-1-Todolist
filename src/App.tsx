import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"


function App(): JSX.Element {

    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML & CSS", isDone: false},
        {id: 2, title: "Sass & SCSS", isDone: false},
        {id: 3, title: "ES6 & TS", isDone: false},
        {id: 4, title: "ES7 & TS", isDone: true},
    ])

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
        // console.log(tasks)
    }

    const [filter, setFilter] = useState<"all" | "active" | "completed">("completed")

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
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
            />
            {/*<TodoList title={ "What to buy"} tasks={tasks}/>*/}
            {/*<TodoList title={ "What to read"}/>*/}
        </div>
    );
}

export default App;
