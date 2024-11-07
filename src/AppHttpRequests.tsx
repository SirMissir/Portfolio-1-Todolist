import Checkbox from '@mui/material/Checkbox'
import React, { ChangeEvent, useEffect, useState } from 'react'
// import { AddItemForm } from '../common/components/AddItemForm/AddItemForm'
// import { EditableSpan } from '../common/components/EditableSpan/EditableSpan'
import AddItemForms from "./AddItemForms";
import EditableSpan from "./EditableSpan";
import axios from "axios";



export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}
type FieldError = {
    error: string
    field: string
}
type CreateTodolistResponse ={
    data: {
        item: Todolist
    },
    fieldsErrors:[FieldError],
    messages:string,
    resultCode:number
}
type DeleteTodolistResponse ={
    resultCode: number
    messages: Array<string>,
    data: {}
}
type UpdateTodolistResponse = {
    resultCode: number,
    messages: Array<string>,
    data: {}
}

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}

export type DomainTask = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<any>({})


    useEffect(() => {
        axios
            .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
                headers: {
                    Authorization: 'Bearer 86f66b1c-6ffa-4b1b-ab89-5c9793a5c5bf ',
                },
            })
            .then(res => {
                const todolists = res.data
                setTodolists(todolists)
                todolists.forEach(tl => {
                    axios
                        .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
                            headers: {
                                Authorization: 'Bearer ',
                                'API-KEY': '',
                            },
                        })
                        .then(res => {
                            setTasks({ ...tasks, [tl.id]: res.data.items })
                        })
                })
            })
    }, [])

    const createTodolistHandler = (title: string) => {
        axios
            .post<CreateTodolistResponse>   (
                'https://social-network.samuraijs.com/api/1.1/todo-lists',
                { title },
                {
                    headers: {
                        Authorization: '',
                        'API-KEY': ''
                    },
                }
            )
            .then(res => {
                const newTodolist = res.data.data.item
                setTodolists([newTodolist, ...todolists])
            })
    }

    const removeTodolistHandler = (id: string) => {
        axios
            .delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
                headers: {
                    Authorization: ' ',
                    'API-KEY': ''
                },
            })
            .then(res => {
                debugger
                setTodolists(data=>data.filter(t=>t.id !==id))
            })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        axios
            .put<UpdateTodolistResponse>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
                { title },
                {
                    headers: {
                        Authorization: 'Bearer 86f66b1c-6ffa-4b1b-ab89-5c9793a5c5bf',
                        'API-KEY': 'ac6ad0ec-ebe5-4c23-bcb3-ac6aff8b99b2',
                    },
                }
            )
            .then(res => {
                debugger
                setTodolists(data=>data.map(t=>t.id===id?{...t,title:title}:t))
            })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        // create task
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        // remove task
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: any) => {
        // update task status
    }

    const changeTaskTitleHandler = (title: string, task: any) => {
        // update task title
    }

    return (
        <div style={{ margin: '20px' }}>
            <AddItemForms addItem={createTodolistHandler} />

            {/* Todolists */}
            {todolists.map((tl: any) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                title={tl.title}
                                changeTitle={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForms addItem={title => createTaskHandler(title, tl.id)} />

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: any) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.isDone}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            title={task.title}
                                            changeTitle={title => changeTaskTitleHandler(title, task)}
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