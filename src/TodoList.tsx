import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from "./AppWithRedux";
import AddItemForms from "./AddItemForms";
import EditableSpan from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {ButtonMemo} from "./ButtonMemo";
import {Task} from "./Task ";


type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string)=>void
    removeTask: (taskId: string, todoListId: string) => void
    changeTodolistFilter: (filter:FilterValuesType, todoListId: string) => void
    changeTaskStatus:(taskId: string, newIsDone: boolean, todoListId: string) => void
    changeTodolistTitle: (newTitle:string, todoListId: string) =>void
    addTask:(title:string, todoListId: string) => void
    removeTodolist: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone:boolean
}

const TodoList =memo( (props:TodoListPropsType) => {
    console.log('Todolist')
    let isAllTasksNotIsDone = true // все не выполнено, change background-color todolist
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }

    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"

    const getFilterTaskForRender = (tasks:Array<TaskType>, filter: FilterValuesType) => {
            switch (filter) {
                case "active":
                    return  tasks.filter(t => !t.isDone )
                case "completed":
                    return tasks.filter(t => t.isDone )
                default:
                    return tasks
            }
        };
    const tasksForRender: Array<TaskType> = getFilterTaskForRender(props.tasks, props.filter)

    const onAllClickHandler=useCallback(() => {
        props.changeTodolistFilter("all", props.todoListId)
    },[props.changeTodolistFilter,props.todoListId])
    const onActiveClickHandler=useCallback(() => {
        props.changeTodolistFilter("active", props.todoListId)
    },[props.changeTodolistFilter,props.todoListId])
    const onCompletedClickHandler=useCallback(() => {
        props.changeTodolistFilter("completed", props.todoListId)
    },[props.changeTodolistFilter,props.todoListId])

    const removeTaskHandler = useCallback((taskId:string) =>{
        props.removeTask(taskId, props.todoListId)
        }, [props.removeTask,props.todoListId])
    const changeTaskTitleHandler = useCallback(( taskId:string,newTitle:string) => {
        props.changeTaskTitle(taskId, newTitle, props.todoListId)
    },[props.changeTaskTitle,props.todoListId])
    const changeTaskStatusHandler =useCallback((taskId:string, newIsDone: boolean) => {
        props.changeTaskStatus(taskId, newIsDone, props.todoListId)
    },[props.changeTaskStatus,props.todoListId])

    const todoListItems: Array<JSX.Element> = tasksForRender.map((task) => {

        return <Task
            key={task.id}
            task={task}
            removeTask={removeTaskHandler}
            changeTaskStatus={changeTaskStatusHandler}
            changeTaskTitle={changeTaskTitleHandler}
        />
    })


    const addTask = useCallback((title:string) =>
        {props.addTask(title, props.todoListId)},
        [props.addTask,props.todoListId])

    const removeTodolist = () =>props.removeTodolist(props.todoListId)

    const changeTodolistTitle = useCallback(( newTitle:string) =>
        props.changeTodolistTitle(newTitle,props.todoListId),
        [props.todoListId,props.changeTodolistTitle])

    return (
        <div>
            <div className={todoClasses}>
                <h3>
                    <EditableSpan title={props.title}  changeTitle={changeTodolistTitle}/>
                    <IconButton aria-label="delete" size="small" onClick={removeTodolist}>
                        <DeleteIcon />
                    </IconButton>
                </h3>
                <AddItemForms addItem={addTask} />
                <ul>
                    {todoListItems}
                </ul>
                <div>
                    <ButtonMemo variant={props.filter === 'all'} color="success" onClick={onAllClickHandler} name={'ALL'}/>
                    <ButtonMemo variant={props.filter === 'active'} color="success" onClick={onActiveClickHandler} name={'Active'}/>
                    <ButtonMemo variant={props.filter === 'completed'} color="success" onClick={onCompletedClickHandler} name={'Completed'}/>
                </div>
            </div>
        </div>
    );
})

export default TodoList;