import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {todolistsApi} from "../api/todolists-api";

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
    const { todolists, setTodolists} = useState<any>(null);
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
    const { todolists, setTodolists } = useState<any>(null);
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
