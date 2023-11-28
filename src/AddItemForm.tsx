import React, {ChangeEvent, useState} from 'react';

const AddItemForm = () => {

    const [title,setTitle]= useState<string>("")
    const [error,setError]= useState<boolean>(false)

    const maxTitleLength = 20
    const recommendedTitleLength = 10
    const isAddTaskNotPossible = title.length === 0 || title.length > maxTitleLength || error

    const setLocalTitleHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    return (
        <div>
                <input
                    placeholder="Enter task title,please"
                    value={title}
                    onChange={setLocalTitleHandler}
                    onKeyDown = {onKeyDownAddTaskHandler}
                    className={error ? "input-error" : ""}
                />
                <button
                    disabled={isAddTaskNotPossible}
                    onClick={addTaskHandler}
                >+</button>

                {longTitleWarningMassage }
                {longTitleErrorMassage}
                {errorMessage}

        </div>
    );
};

export default AddItemForm;
