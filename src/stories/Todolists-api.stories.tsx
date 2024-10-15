import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const GetTodolists = () => {
    const { state, setState } = useState<any>(null);

    useEffect( () => {
        let promise =axios.get('http://social-network.samuraijs.com/api/1.1/todo-lists')

        promise.then((res)=>{

        })

    } );

    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolists = () => {
    const { state, setState } = useState<any>(null);


    useEffect(() => {

    });

    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolists = () => {
    const { state, setState } = useState<any>(null);

    };
    useEffect(() => {

    }, );

    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolists = () => {
    const { state, setState } = useState<any>(null);


    useEffect(() => {

    }, );

    return <div>{JSON.stringify(state)}</div>;
};