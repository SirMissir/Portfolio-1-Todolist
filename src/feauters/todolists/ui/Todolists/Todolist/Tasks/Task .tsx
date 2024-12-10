import React, { ChangeEvent, memo } from 'react';
import Checkbox from "@mui/material/Checkbox";
import EditableSpan from "../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskType } from "../../TodoListOld";

type TaskPropsType = {
    task: TaskType;
    removeTask: (taskId: string) => void;
    changeTaskTitle: (taskId: string, newTitle: string) => void;
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void;
}

export const Task = memo(({ task, removeTask, changeTaskTitle, changeTaskStatus }: TaskPropsType) => {
    const removeTaskHandler = () => removeTask(task.id);

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked);
    };

    const changeTaskTitleHandler = (newTitle: string) => {
        changeTaskTitle(task.id, newTitle);
    };

    return (
        <li key={task.id}>
            <Checkbox
                onChange={changeTaskStatusHandler}
                checked={task.isDone}
            />
            <EditableSpan
                title={task.title}
                changeTitle={changeTaskTitleHandler}
                classes={task.isDone ? "task-done" : "task"}
            />
            <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </li>
    );
});