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

type TaskStateType = {
    [todolistId:string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"



function App(): JSX.Element {
    const todoListsId_1 = v1()
    const todoListsId_2 = v1()

    let [todoLists,setTodoLists]=useState<Array<TodoListType>>([
        {id:v1(),title:'What to learn',filter:'all'},
        {id:v1(),title:'What to buy',filter:'active'}
    ])
    const [tasks,setTasks] = useState<TaskStateType>({
        [todoListsId_1]:[
            {id: v1(), title: "HTML & CSS", isDone: false},
            {id: v1(), title: "Sass & SCSS", isDone: false},
            {id: v1(), title: "ES6 & TS", isDone: false},
            {id: v1(), title: "Redux", isDone: true},
        ],
        [todoListsId_2]:[
            {id: v1(), title: "Water", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Salt", isDone: false},
            {id: v1(), title: "Beer", isDone: true},
        ],
    })



    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title:title, isDone:false}
        // const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        // const resultOfUpdate: Array<TaskType> = [newTask, ... tasksForUpdate]
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = resultOfUpdate
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const removeTask = (taskId: string, todoListId: string) => {
        // const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        // const resultOfUpdate: Array<TaskType> = tasksForUpdate.filter((task) => task.id !== taskId)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = resultOfUpdate
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter((task) => task.id !== taskId)})
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) =>{
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t,isDone: newIsDone} : t)})
    }
    const changeTodolistFilter = (filter:FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter:filter} : tl))
    }
    const removeTodolist = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }


    const getFilterTaskForRender = (tasksList:Array<TaskType>, filterValue: FilterValuesType) => {
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
            {todoLists.map(el=>{
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
