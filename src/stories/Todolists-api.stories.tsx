import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default {
        title: 'API/GetTodolists'
}

const settings= {
    withCredentials: true
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
            .get('https://social-network.samuraijs.com/api/1.1/todo-lists', {
                headers: {
                    Authorization: 'Token',
                },
            })
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
                {headers: {
                    Authorization: 'Bearer 86f66b1c-6ffa-4b1b-ab89-5c9793a5c5bf',
                },
            }
        )
            .then(res => {
                // console.log(res.data)
                setTodolists(res.data)
            })
    }, [])
    return <div>{JSON.stringify(todolists)}</div>;
};


// export const UpdateTodolists = () => {
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
// export const DeleteTodolists = () => {
//     const { state, setState } = useState<any>(null);
//
//     useEffect(() => {
//         const todolistId = "v1()"; // Замените на актуальный ID списка задач
//
//         const deleteTodoList = async () => {
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