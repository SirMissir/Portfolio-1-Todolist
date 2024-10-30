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
                // console.log(res.data)
                setTodolists(res.data)
            })
    }, [])
    return <div>{JSON.stringify(todolists)}</div>;
};


// export const  DeleteTodolists = () => {
//     const { state, setState } = useState<any>(null);
//     useEffect(() => {
//         const todolistId = "v1()"
//         let promise =axios.delet('http://social-network.samuraijs.com/api/1.1/todo-lists',{title: "StoryBookTodoList"},settings)
//
//         promise.then((res)=>{
//             setState(res.data)
//         })
//     },[]);
//
//     return <div>{JSON.stringify(state)}</div>;
// }

// export const UpdateTodolists = () => {
//     const { state, setState } = useState<any>(null);
//
//     useEffect(() => {
//         const todolistId = "v1()"; // Замените на актуальный ID списка задач
//
//         const UpdateTodolists = async () => {
//             try {
//                 await axios.delete(`http://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`);
//                 setState({ message: 'Список задач успешно удален' });
//             } catch (error) {
//                 console.error('Ошибка при удалении списка задач:', error);
//             }
//         };
//
//         deleteTodoList();
//     }, []);
//
//     return <div>{JSON.stringify(state)}</div>;
// };