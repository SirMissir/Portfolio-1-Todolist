import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default {
        title: 'API'
}

const settings= {
    withCredetials: true
}


export const GetTodolists = () => {
    const { state, setState } = useState<any>(null);

    useEffect( () => {
        let promise =axios.get('http://social-network.samuraijs.com/api/1.1/todo-lists',settings)

        promise.then((res)=>{
                setState(res.data)
        })

    },[] );

    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolists = () => {
    const { state, setState } = useState<any>(null);
    useEffect(() => {
        let promise =axios.get('http://social-network.samuraijs.com/api/1.1/todo-lists',{title: "StoryBookTodoList"},settings)

        promise.then((res)=>{
            setState(res.data)
        })
    },[]);
    return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTodolists = () => {
    const { state, setState } = useState<any>(null);
    useEffect(() => {
        const todolistId = "v1()"
        let promise =axios.delet('http://social-network.samuraijs.com/api/1.1/todo-lists',{title: "StoryBookTodoList"},settings)

        promise.then((res)=>{
            setState(res.data)
        })
    },[]);

    return <div>{JSON.stringify(state)}</div>;
}
export const DeleteTodolists = () => {
    const { state, setState } = useState<any>(null);

    useEffect(() => {
        const todolistId = "v1()"; // Замените на актуальный ID списка задач

        const deleteTodoList = async () => {
            try {
                await axios.delete(`http://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`);
                setState({ message: 'Список задач успешно удален' });
            } catch (error) {
                console.error('Ошибка при удалении списка задач:', error);
            }
        };

        deleteTodoList();
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};