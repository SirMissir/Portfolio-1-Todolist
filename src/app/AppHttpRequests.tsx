import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForms} from "../common/components/AddItemForm/AddItemForms";
import {EditableSpan} from "../common/components/EditableSpan/EditableSpan";
import {UpdateTaskModel} from "../feauters/todolists/api/tasksApi.types";
import {Todolist} from "../feauters/todolists/api/todolistsApi.types";
import {todolistsApi} from "../feauters/todolists/api/todolistsApi";
import {tasksAPI} from "../feauters/todolists/api/tasksApi";
import {DomainTask} from "../common/types/type";
import {TaskStatus} from "../common/enums/enums";


export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<any>({})


    useEffect(() => {

        todolistsApi.getTodolists().then(res => {
            const todolists = res.data;
            setTodolists(todolists);

            Promise.all(
                todolists.map(tl =>
                    tasksAPI.getTasks(tl.id).then(res => ({[tl.id]: res.data.items}))
                )
            ).then(results => {
                const tasks = results.reduce((acc, current) => ({...acc, ...current}), {});
                setTasks(tasks);
            });
        });
    }, []);
    const createTodolistHandler = (title: string) => {
        todolistsApi.createTodolists(title)
            .then(res => {
                const newTodolist = res.data.data.item
                setTodolists([newTodolist, ...todolists])
            })
    }

    const removeTodolistHandler = (id: string) => {
        todolistsApi.removeTodolist(id)
            .then(res => {
                setTodolists(data => data.filter(t => t.id !== id))
            })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        todolistsApi.updateTodolist({ id, title }).then(res => {
            const newTodolists = todolists.map(item => (item.id === id ? { ...item, title } : item))
            setTodolists(newTodolists)
        })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        tasksAPI.createTask(todolistId,title)
            .then(res => {
                const newTask = res.data.data.item
                setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        tasksAPI.deleteTask(todolistId,taskId)
            .then(res => {
                console.log(res.data)
                setTasks((data: Record<string, DomainTask[]>) => ({
                    ...data, [todolistId]: data[todolistId].filter(t => t.id !== taskId)
                }))
            })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
        let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

        const model: UpdateTaskModel = {
            status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            completed: task.completed
        }

        tasksAPI.updateTask(task,model)
            .then(res => {
                const newTasks = tasks[task.todoListId].map((t: DomainTask) => (t.id === task.id ? {...t, ...model} : t))
                setTasks({...tasks, [task.todoListId]: newTasks})
            })

    }

    const changeTaskTitleHandler = (title: string, task: DomainTask) => {

        const model: UpdateTaskModel = {
            status: task.status,
            title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            completed: task.completed
        }

        tasksAPI.updateTask(task,model)
            .then(res => {
                setTasks((data: Record<string, DomainTask[]>) => ({
                    ...data,
                    [task.todoListId]: data[task.todoListId].map((t: DomainTask) => // Указываем тип для t
                        t.id === res.data.data.item.id ? res.data.data.item : t
                    )
                }))
            })

    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForms addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map((tl: any) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                value={tl.title}
                                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForms addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: DomainTask) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2 ? true : false}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            value={task.title}
                                            onChange={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}


// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}