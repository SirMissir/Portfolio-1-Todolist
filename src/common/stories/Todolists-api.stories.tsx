import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {DomainTask, GetTasksResponse, todolistsApi} from "../../feauters/todolists/api/todolists-api";

export default {
        title: 'API/GetTodolists'
}

const settings= {
    withCredentials: true,
    headers: {
        "API-KEY": "ac6ad0ec-ebe5-4c23-bcb3-ac6aff8b99b2"
    }
}
export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}
export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<any>([])

    useEffect(() => {
        todolistsApi.getTodolists()
            .then(res => {
                // console.log(res.data)
                setTodolists(res.data)
            })
    }, [])
    return <div>{JSON.stringify(todolists)}</div>;
}
export const CreateTodolists = () => {
    const [todolists, setTodolists] = useState<any>(null);

    useEffect(() => {
       todolistsApi.createTodolists("NewTodolist")
            .then(res => {
                debugger
                // console.log(res.data)
                setTodolists(res.data)
            })
    }, [])
    return <div>{JSON.stringify(todolists)}</div>;
};
export const DeleteTodolists = () => {
    const [todolists, setTodolists] = useState<any>(null);
    const todolistId = '12d39412-a009-4946-ab14-5a27b4250e9c'
    useEffect(() => {
        todolistsApi.deleteTodolists(todolistId)
            .then(res => {
                debugger
                // console.log(res.data)
                setTodolists(res.data)
            })
    }, [])

    return <div>{JSON.stringify(todolists)}</div>;
}
export const UpdateTodolists = () => {
    const [todolists, setTodolists]  = useState<any>(null);
    const todolistId = 'e535c372-597b-4907-8faa-f30d8e2b9535'
        useEffect (() => {

            todolistsApi.updateTodolists(todolistId,"UpdateName")
                .then(res => {
                    // console.log(res.data)
                    setTodolists(res.data)
                })
        }, [])
        return <div>{JSON.stringify(todolists)}</div>;
}
export const GetTasks = () => {
    const  [tasks, setTasks ] = useState<GetTasksResponse>();
        useEffect (() => {
            const todolistId = '111b8a35-15f9-425e-9e55-af6f84f515a5';
            todolistsApi
                .getTasks(todolistId)
                .then(res => {
                    // console.log(res.data)
                    setTasks(res.data)
                })
        }, [])
        // return <div>{JSON.stringify(tasks)}</div>;
    return (
        <div>
            <h2>Tasks</h2>
            {tasks ? (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.items.map((task: DomainTask) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );

}
export const DeleteTask = () => {
    const  [task, setTask] = useState<any>(null);
    useEffect(() => {
        const todolistId = '111b8a35-15f9-425e-9e55-af6f84f515a5'
        const taskId = '090cc7ec-01b8-43a3-b8b4-7ace035edf9a';
        todolistsApi.deleteTask(todolistId,taskId)
            .then(res => {
                // console.log(res.data)
                setTask(res.data)
            })
    }, [])

    return <div>{JSON.stringify(task)}</div>;
}
export const CreateTask = () => {
    const  [task, setTask] = useState<any>(null);
    useEffect(() => {
        const todolistId = '111b8a35-15f9-425e-9e55-af6f84f515a5'
        const title = "NewTask"
        todolistsApi.createTask(todolistId,title)
            .then(res => {
                // console.log(res.data)
                setTask(res.data)
            })
    }, [])

    return <div>{JSON.stringify(task)}</div>;
}
export const UpdateTask = () => {
    const  [task, setTask] = useState<any>(null);
    useEffect(() => {
        const todolistId = '111b8a35-15f9-425e-9e55-af6f84f515a5'
        const taskId = '090cc7ec-01b8-43a3-b8b4-7ace035edf9a'
        const title = "UpdateNewTask"
        todolistsApi.updateTask(todolistId,taskId,title)
            .then(res => {
                // console.log(res.data)
                setTask(res.data)
            })
    }, [])

    return <div>{JSON.stringify(task)}</div>;
}
