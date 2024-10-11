import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export type AddItemFormPropsType = {
    addItem: (title:string)=>void
}

const AddItemForms = memo( (props:AddItemFormPropsType) => {
        console.log('AddItemForm')
    const [title,setTitle]= useState<string>("")
    const [error,setError]= useState<boolean>(false)

    let recommendedTitleLength=5;
    let maxTitleLength=8;

    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle ){
            props.addItem(trimmedTitle)
            setTitle("")
        } else {
            setError(true)
        }
    }

    const setLocalTitleHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const isAddTaskNotPossible = title.length === 0 || title.length > maxTitleLength || error
    const onKeyDownAddTaskHandler =
        isAddTaskNotPossible ? undefined :(e:KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()




    const longTitleWarningMassage = (title.length > recommendedTitleLength && title.length <= maxTitleLength ) &&
        <div style={{color:"red"}}>Title should be shorter</div>
    const longTitleErrorMassage = title.length > maxTitleLength &&
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
                size = {"small"}

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
                style={stylesButton}
            >+</Button>
                {longTitleWarningMassage }
                {longTitleErrorMassage}
                {errorMessage}
        </div>
    );
});

export default AddItemForms;
