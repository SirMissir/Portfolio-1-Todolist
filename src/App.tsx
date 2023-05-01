import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id:number
    title: string
    isDone: boolean
}
function App() {
    const tasks: TaskType[] = [
        {id: 1 , title: "HTML & CSS" , isDone: true},
        {id: 2 , title: "Sass & SCSS" , isDone: false},
        {id: 3 , title: "ES6 & TS" , isDone: true},
    ]
   const tasks1: TaskType[] = [
        {id: 1 , title: "HTML & CSS" , isDone: false},
        {id: 2 , title: "Sass & SCSS" , isDone: false},
        {id: 3 , title: "ES6 & TS" , isDone: false},
    ]

    return (
        <div className="App">
            <TodoList title={ "What to learn"} tasks={tasks}/>
            <TodoList title={ "What to buy"} tasks={tasks1}/>
            {/*<TodoList title={ "What to read"}/>*/}
        </div>
    );
}

export default App;
