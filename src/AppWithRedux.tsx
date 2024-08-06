import React, {Reducer, useCallback, useReducer, useState} from 'react';
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
import {
    addTodoListAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";



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
export type TaskStateType = {
    [todolistId:string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed"

function AppWithRedux(): JSX.Element {

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId,todoListId))
    }
    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title,todoListId))},[])

    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) =>{
        dispatch(changeTaskStatusAC(taskId,newIsDone,todoListId))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId))
    }

    const changeTodolistFilter = (filter:FilterValuesType, todoListId: string) => {
        dispatch(changeTodolistFilterAC(filter,todoListId))
    }
    const removeTodolist = (todoListId: string) => {
        dispatch(removeTodolistAC(todoListId))
    }

    const changeTodolistTitle = (newTitle:string, todoListId: string) => {
        dispatch(changeTodolistTitleAC (newTitle,todoListId))
    }
    const addTodoList = useCallback((title:string) => {
        dispatch(addTodoListAC(title))
    },[dispatch])


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
                    <AddItemForms addItem={addTodoList} recommendedTitleLength={5} maxTitleLength={8}/>
                </Grid>
                <Grid container spacing = {2}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}


export default AppWithRedux