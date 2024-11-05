import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {GetTasksResponse, todolistsApi} from "../api/todolists-api";

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
        return <div>{JSON.stringify(tasks)}</div>;
}
export const DeleteTask = () => {
    const  [task, setTask] = useState<any>(null);
    useEffect(() => {
        const todolistId = 'a41cf05a-dd8e-474c-9387-99b7986b4942'
        const taskId = '';
        todolistsApi.deleteTask(todolistId,taskId)
            .then(res => {
                debugger
                // console.log(res.data)
                setTask(res.data)
            })
    }, [])

    return <div>{JSON.stringify(task)}</div>;
}
