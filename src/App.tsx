import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id:string
    title:string
    filter:FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed"


function App(): JSX.Element {

    let [todolist,setTodolist]=useState<Array<TodoListType>>([
        {id:v1(),title:'What to learn',filter:'all'},
        {id:v1(),title:'What to buy',filter:'active'}
    ])

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
    // const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeTodolistFilter = (filter:FilterValuesType) => {
        setFilter(filter)
    }
    const getFilterTaskForRender = (todolist, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return  tasksList.filter(t => !t.isDone )
            case "completed":
                return tasksList.filter(t => t.isDone )
            default:
                return tasksList
        }
    }
    return (
        <div className="App">
            {todolist.map(el=>{
                debugger
                return(
                    <TodoList
                        title={el.title}
                        tasks={getFilterTaskForRender(tasks,filter)}
                        filter={el.filter}
                        removeTask={removeTask}
                        changeTodolistFilter={changeTodolistFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                    />
                )
            })}

            {/*<TodoList title={ "What to buy"} tasks={tasks}/>*/}
            {/*<TodoList title={ "What to read"}/>*/}
        </div>
    );
}

export default App;
