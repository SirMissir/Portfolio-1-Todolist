import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
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
type CreateTodolistResponse = {
    data: {
        item: Todolist
    },
    fieldsErrors: [FieldError],
    messages: string,
    resultCode: number
}
type DeleteTodolistResponse = {
    resultCode: number
    messages: Array<string>,
    data: {}
}
type UpdateTodolistResponse = {
    resultCode: number,
    messages: Array<string>,
    data: {}
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
    completed: boolean
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}
export type CreateTaskResponse = {
    resultCode: number
    messages: string
    data: {
        item: {
            description: string
            title: string
            completed: boolean
            status: number
            priority: number
            startDate: string
            deadline: string
            id: string
            todoListId: string
            order: number
            addedDate: string

        }
    }

}
export type DeleteTaskResponse = {
    resultCode: number
    messages: string
    data: {}
    fieldsErrors: [FieldError]

}
export type UpdateTaskResponse = {
    resultCode: number
    messages: string,
    data: {item: DomainTask}
}
export type UpdateTaskModel = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<any>({})


    // useEffect(() => {
    //     axios
    //         .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
    //             headers: {
    //                 Authorization: 'Bearer 86f66b1c-6ffa-4b1b-ab89-5c9793a5c5bf',
    //                 'API-KEY': 'ac6ad0ec-ebe5-4c23-bcb3-ac6aff8b99b2',
    //             },
    //         })
    //         .then(res => {
    //             console.log(res.data)
    //             const todolists = res.data
    //             setTodolists(todolists)
    //             todolists.forEach(tl => {
    //                 axios
    //                     .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
    //                         headers: {
    //                             Authorization: 'Bearer 86f66b1c-6ffa-4b1b-ab89-5c9793a5c5bf',
    //                             'API-KEY': 'ac6ad0ec-ebe5-4c23-bcb3-ac6aff8b99b2',
    //                         },
    //                     })
    //                     .then(res => {
    //                         console.log(res.data.items)
    //                         setTasks({...tasks, [tl.id]: res.data.items})
    //                     })
    //             })
    //         })
    // }, [])
    useEffect(() => {
        axios
            .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
                headers: {
                    Authorization: 'Bearer 86f66b1c-6ffa-4b1b-ab89-5c9793a5c5bf',
                    'API-KEY': 'ac6ad0ec-ebe5-4c23-bcb3-ac6aff8b99b2',
                },
            })
            .then(res => {
                const todolists = res.data;
                setTodolists(todolists);

                Promise.all(
                    todolists.map(tl =>
                        axios
                            .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
                                headers: {
                                    Authorization: 'Bearer 86f66b1c-6ffa-4b1b-ab89-5c9793a5c5bf',
                                    'API-KEY': 'ac6ad0ec-ebe5-4c23-bcb3-ac6aff8b99b2',
                                },
                            })
                            .then(res => ({ [tl.id]: res.data.items }))
                    )
                ).then(results => {
                    const tasks = results.reduce((acc, current) => ({ ...acc, ...current }), {});
                    setTasks(tasks);
                });
            });
    }, []);
    const createTodolistHandler = (title: string) => {
        axios
            .post<CreateTodolistResponse>(
                'https://social-network.samuraijs.com/api/1.1/todo-lists',
                {title},
                {
                    headers: {
                        Authorization: 'Bearer 86f66b1c-6ffa-4b1b-ab89-5c9793a5c5bf',
                        'API-KEY': 'ac6ad0ec-ebe5-4c23-bcb3-ac6aff8b99b2',
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
                    Authorization: 'Bearer 86f66b1c-6ffa-4b1b-ab89-5c9793a5c5bf',
                    'API-KEY': 'ac6ad0ec-ebe5-4c23-bcb3-ac6aff8b99b2',
                },
            })
            .then(res => {
                debugger
                setTodolists(data => data.filter(t => t.id !== id))
            })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        axios
            .put<UpdateTodolistResponse>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
                {title},
                {
                    headers: {
                        Authorization: 'Bearer 86f66b1c-6ffa-4b1b-ab89-5c9793a5c5bf',
                        'API-KEY': 'ac6ad0ec-ebe5-4c23-bcb3-ac6aff8b99b2',
                    },
                }
            )
            .then(res => {
                debugger
                setTodolists(data => data.map(t => t.id === id ? {...t, title: title} : t))
            })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        axios
            .post<CreateTaskResponse>(
                `https://social-network.samuraijs.com/api/1.1//todo-lists/${todolistId}/tasks`,
                {title},
                {
                    headers: {
                        Authorization: 'Bearer 86f66b1c-6ffa-4b1b-ab89-5c9793a5c5bf',
                        'API-KEY': 'ac6ad0ec-ebe5-4c23-bcb3-ac6aff8b99b2',
                    },
                }
            )
            .then(res => {
                const newTask = res.data.data.item
                setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        axios
            .delete<DeleteTaskResponse>(
                `https://social-network.samuraijs.com/api/1.1//todo-lists/${todolistId}/tasks/${taskId}`,
                {
                    headers: {
                        Authorization: 'Bearer 86f66b1c-6ffa-4b1b-ab89-5c9793a5c5bf',
                        'API-KEY': 'ac6ad0ec-ebe5-4c23-bcb3-ac6aff8b99b2',
                    }
                },
            )
            .then(res => {
                console.log(res.data)
                setTasks((data: Record<string, DomainTask[]> )=>({
                    ...data,[todolistId]:data[todolistId].filter(t=>t.id!==taskId)
                }))
            })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
        let status = e.currentTarget.checked ? 2 : 0

        const model: UpdateTaskModel = {
            status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            completed: task.completed
        }

        axios
            .put<UpdateTaskResponse>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
                model,
                {
                    headers: {
                        Authorization: 'Bearer 86f66b1c-6ffa-4b1b-ab89-5c9793a5c5bf',
                        'API-KEY': 'ac6ad0ec-ebe5-4c23-bcb3-ac6aff8b99b2',
                    },
                }
            )
            .then(res => {
                const newTasks = tasks[task.todoListId].map((t: DomainTask) => (t.id === task.id ? {...t, ...model} : t))
                setTasks({...tasks, [task.todoListId]: newTasks})
            })

    }

    const changeTaskTitleHandler = (title: string, task: DomainTask) => {

        const model: UpdateTaskModel = {
            status:task.status,
            title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            completed: task.completed
        }

        axios
            .put<UpdateTaskResponse>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
                model,
                {
                    headers: {
                        Authorization: ,
                        'API-KEY': ,
                    },
                }
            )
            .then(res=> {
                setTasks((data: Record<string, DomainTask[]> )=> ({
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
                                title={tl.title}
                                changeTitle={(title: string) => updateTodolistHandler(tl.id, title)}
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