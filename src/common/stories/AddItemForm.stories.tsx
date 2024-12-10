import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Meta, StoryObj} from "@storybook/react";
import AddItemForms, {AddItemFormPropsType} from "../AddItemForms";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {action} from "@storybook/addon-actions";


const meta: Meta<typeof AddItemForms> = {
    title: 'Todolist/AddItemForm',
    component: AddItemForms,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    argTypes:{
        addItem:{
            description: 'Cliked button inside form',
            action: 'cliked'
        }
    }
};

export default meta;

// // Определяем историю с добавлением элемента
// const Template: StoryFn<{ addItem: (title: string) => void }> = (args) => <AddItemForms {...args} />;
//
// export const AddItemFormBaseExample = Template.bind({});
// AddItemFormBaseExample.args = {
//      // Передаем action в args
// };

type Story = StoryObj<typeof  AddItemForms>

export const AddItemFormsStory: Story = {};

const ErrorAddItemForms = memo( (props:AddItemFormPropsType) => {
    console.log('AddItemForm')
    const [title,setTitle]= useState<string>("12345678910")
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

export const ErrorAddItemFormsStory: Story = {
    render: () => <ErrorAddItemForms addItem={action('Title is hard required')}/>
};