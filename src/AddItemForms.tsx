import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
// import {Button} from "@material-ui/core/Button";
import Button from '@mui/material/Button';

type AddItemFormPropsType = {
    addItem: (title:string)=>void
    recommendedTitleLength: number
    maxTitleLength:number
}

const AddItemForms:FC<AddItemFormPropsType> = ({addItem, recommendedTitleLength, maxTitleLength}) => {
    const [title,setTitle]= useState<string>("")
    const [error,setError]= useState<boolean>(false)
    const setLocalTitleHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const isAddTaskNotPossible = title.length === 0 || title.length > maxTitleLength || error
    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined
        :(e:KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()
    const longTitleWarningMassage = (title.length > recommendedTitleLength && title.length <= maxTitleLength ) &&
        <div style={{color:"red"}}>Title should be shorter</div>
    const longTitleErrorMassage = title.length > maxTitleLength &&
        <div style={{color:"red"}}>Title is too long !!!</div>
    const errorMessage = error && <div style={{color: "red"}}>Title is hard required</div>
    return (
        <div>
                <input
                    placeholder="Enter task title,please"
                    value={title}
                    onChange={setLocalTitleHandler}
                    onKeyDown = {onKeyDownAddTaskHandler}
                    className={error ? "input-error" : ""}
                />
            <Button
                disabled={isAddTaskNotPossible}
                onClick={addTaskHandler}
                variant={"contained"}
                size="small"
            >+</Button>
                {longTitleWarningMassage }
                {longTitleErrorMassage}
                {errorMessage}
        </div>
    );
};

export default AddItemForms;
