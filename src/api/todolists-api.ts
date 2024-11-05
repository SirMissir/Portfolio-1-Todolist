import axios from "axios";
import {number, string} from "prop-types";

const settings= {
    withCredentials: true,
    headers: {
        "API-KEY": "ac6ad0ec-ebe5-4c23-bcb3-ac6aff8b99b2"
    }
}

 type getTodolistsResponseType = {
    id:string,
    title:string,
    addedDate:string,
    order:number
}
 type createTodolistResponseType ={
    resultCode: number,
    messages:Array<string>,
    data: {
        item: {getTodolistsResponseType}
    }
}
type deleteTodolistResponseType ={
    resultCode: number,
    messages:Array<string>,
    data: {

    }
}
type updateTodolistResponseType ={
    resultCode: number,
    messages:Array<string>,
    data: {

    }
}

export const todolistsApi = {
    getTodolists(){
       const promise = axios
            .get<Array<getTodolistsResponseType>>('https://social-network.samuraijs.com/api/1.1/todo-lists',
                settings
            )
        return promise;
    },
    createTodolists(title:string){
       const promise = axios
           .post<createTodolistResponseType>(
               'https://social-network.samuraijs.com/api/1.1/todo-lists',
               { title: title },
               settings
           )
        return promise;
    },
    deleteTodolists(id:string){

       const promise =
        axios
            .delete<deleteTodolistResponseType>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
                settings
            )
        return promise;
    },
    updateTodolists(id:string,title: string){

       const promise =  axios
           .put<updateTodolistResponseType  >(
               'https://social-network.samuraijs.com/api/1.1/todo-lists/${id}',
               { title: title },
               settings
           )
        return promise;
    },

 }