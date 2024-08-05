import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    addItem: (title:string)=>void
    recommendedTitleLength: number
    maxTitleLength:number
}

const AddItemForms = memo( (props:AddItemFormPropsType) => {
        console.log('err')
    const [title,setTitle]= useState<string>("")
    const [error,setError]= useState<boolean>(false)


    const setLocalTitleHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const isAddTaskNotPossible = title.length === 0 || title.length > props.maxTitleLength || error

    const addTaskHandler = () => {
        console.log('add TaskHandler')
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
            setTitle("")
        } else {
            setError(true)
        }
    }

    const onKeyDownAddTaskHandler =
        isAddTaskNotPossible ? undefined :(e:KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()

    const longTitleWarningMassage = (title.length > props.recommendedTitleLength && title.length <= props.maxTitleLength ) &&
        <div style={{color:"red"}}>Title should be shorter</div>
    const longTitleErrorMassage = title.length > props.maxTitleLength &&
        <div style={{color:"red"}}>Title is too long !!!</div>
    const errorMessage = error && <div style={{color: "red"}}>Title is hard required</div>

    const stylesButton ={
        maxWidth: '22px',
        maxHeight: '22px',
        minWidth: '22px',
        minHeight: '22px'
    }
    return (
        <div>
            <TextField
                id="outlined-basic"
                variant="outlined"
                label="type smth..."
                placeholder="Enter task title,please"
                value={title}
                onChange={setLocalTitleHandler}
                onKeyDown = {onKeyDownAddTaskHandler}
                className={error ? "input-error" : ""}
                size = {"small"}

            />
            <Button
                disabled={isAddTaskNotPossible}
                onClick={addTaskHandler}
                variant={"contained"}
                size="small"
                style={stylesButton}
            >+</Button>
                {longTitleWarningMassage }
                {longTitleErrorMassage}
                {errorMessage}
        </div>
    );
});

export default AddItemForms;
