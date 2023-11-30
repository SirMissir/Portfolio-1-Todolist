import React, {ChangeEvent, FC, useState} from 'react';
type EditableSpanPropsType = {
    title:string
    classes?: string
    changeTitle: (newTitle:string )=> void
}
const EditableSpan: FC<EditableSpanPropsType> = (
    {
        title,
        classes,
        changeTitle
    }) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [value,setValue]= useState<string>(title)
    const toggleEditMode = ()=>{
        if (isEditMode){
            changeTitle(value)
        }
        setIsEditMode(!isEditMode)
    }
    const setValueHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setValue(e.currentTarget.value)
    }

    return(
        isEditMode
            ? <input
            value={value}
            autoFocus
            onChange={setValueHandler}
            onBlur={toggleEditMode}
            />
            : <span
                onDoubleClick={toggleEditMode}
                className={classes}>{title}</span>
    );
};

export default EditableSpan;