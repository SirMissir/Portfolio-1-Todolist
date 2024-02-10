import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from 'uuid';
import AddItemForms from "./AddItemForms";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
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
        {id:todoListsId_1,title:'What to learn',filter:'all'},
        {id:todoListsId_2,title:'What to buy',filter:'active'}
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



    const removeTask = (taskId: string, todoListId: string) => {
        // const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        // const resultOfUpdate: Array<TaskType> = tasksForUpdate.filter((task) => task.id !== taskId)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = resultOfUpdate
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter((task) => task.id !== taskId)})
    }
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
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) =>{
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t,isDone: newIsDone} : t)})
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) =>{
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t,title: newTitle} : t)})}

    const changeTodolistFilter = (filter:FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter:filter} : tl))
    }
    const removeTodolist = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const changeTodolistTitle = (newTitle:string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title:newTitle} : tl))
    }
    const addTodoList = (title:string) => {
        const newTodo: TodoListType ={
            id: v1(),
            title:title,
            filter: "all"
        }
        setTodoLists([...todoLists,newTodo])
        setTasks({...tasks,[newTodo.id]:[]})
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
    };

    function ButtonAppBar() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }

    const todoListsComponents = todoLists.map(el => {
        const tasksForRender: Array<TaskType> = getFilterTaskForRender(tasks[el.id], el.filter)
        return <Grid item>
            {/*<Paper elevation={3}>*/}
            <TodoList
                key={el.id}

                todoListId={el.id}
                title={el.title}
                tasks={tasksForRender}
                filter={el.filter}

                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                removeTodolist={removeTodolist}
                changeTodolistTitle={changeTodolistTitle}
                changeTodolistFilter={changeTodolistFilter}
            />
        {/*</Paper>*/}
        </Grid>
    });

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid  container>
                    <AddItemForms addItem={addTodoList} recommendedTitleLength={15} maxTitleLength={20}/>
                </Grid>
                <Grid container spacing = {2}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}


export default App