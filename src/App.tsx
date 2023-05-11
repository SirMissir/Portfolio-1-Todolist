import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id:number
    title: string
    isDone: boolean
}


function App(): JSX.Element {

   const [tasks,setTasks] = useState ([
        {id: 1 , title: "HTML & CSS" , isDone: false},
        {id: 2 , title: "Sass & SCSS" , isDone: false},
        {id: 3 , title: "ES6 & TS" , isDone: false},
        {id: 4 , title: "ES7 & TS" , isDone: true},
    ])

   // let tasks: TaskType[] = [
   //      {id: 1 , title: "HTML & CSS" , isDone: false},
   //      {id: 2 , title: "Sass & SCSS" , isDone: false},
   //      {id: 3 , title: "ES6 & TS" , isDone: false},
   //      {id: 4 , title: "ES7 & TS" , isDone: false},
   //  ]

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter((task)=> task.id !== taskId))
        // console.log(tasks)
    }


    return (
        <div className="App">
            <TodoList
                title={ "What to learn"}
                tasks={tasks}
                removeTask={removeTask}
            />
            {/*<TodoList title={ "What to buy"} tasks={tasks}/>*/}
            {/*<TodoList title={ "What to read"}/>*/}
        </div>
    );
}

export default App;
