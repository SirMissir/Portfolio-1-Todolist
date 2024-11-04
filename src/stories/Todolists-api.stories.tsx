import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        axios
            .get('https://social-network.samuraijs.com/api/1.1/todo-lists',
                settings
            )
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
        axios
            .post(
                'https://social-network.samuraijs.com/api/1.1/todo-lists',
                { title: "StoryBookTodoList" },
                settings
        )
            .then(res => {
                debugger
                // console.log(res.data)
                setTodolists(res.data)
            })
    }, [])
    return <div>{JSON.stringify(todolists)}</div>;
};


export const  DeleteTodolists = () => {
    const { todolists, setTodolists} = useState<any>(null);
    useEffect(() => {
        axios
            .delete(
                'https://social-network.samuraijs.com/api/1.1/todo-lists/e535c372-597b-4907-8faa-f30d8e2b9535',
                settings
            )
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

        useEffect (() => {
            axios
                .put(
                    'https://social-network.samuraijs.com/api/1.1/todo-lists/5d350a0c-8aa3-4164-93a2-faf873784527',
                    { title: "UpdateName" },
                    settings
                )
                .then(res => {
                    // console.log(res.data)
                    setTodolists(res.data)
                })
        }, [])
        return <div>{JSON.stringify(todolists)}</div>;
}
