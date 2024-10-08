import React from 'react';
import { Meta, StoryFn } from "@storybook/react";
import { action } from '@storybook/addon-actions'; // Импортируем action из addon-actions
import {Task} from "../Task ";
import {TaskType} from "../TodoList"


const meta: Meta<typeof Task> = {
    title: 'Todolist/Task',
    component: Task,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    args: {
            task: { id: '1', title: 'Sample Task', isDone: false }, // Пример задачи
            removeTask: action('Task removed'),
            changeTaskTitle: action('Task title changed'),
            changeTaskStatus: action('Task status changed'),
    },
};

export default meta;

// Определяем историю с добавлением элемента
const Template: StoryFn<{
    task: TaskType;
    removeTask: (taskId: string) => void;
    changeTaskTitle: (taskId: string, newTitle: string) => void;
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void;
}> = (args) => <Task {...args} />;

// Обработчики для действий
const removeTaskHandler = action('Task removed');
const changeTaskTitleHandler = action('Task title changed');
const changeTaskStatusHandler = action('Task status changed');

// Пример обычного состояния
export const TaskBaseExample = Template.bind({});
TaskBaseExample.args = {
    task: {
        id: '1',
        title: 'Learn Storybook',
        isDone: false,
    },
    removeTask: removeTaskHandler,
    changeTaskTitle: (taskId, newTitle) => changeTaskTitleHandler(taskId, newTitle),
    changeTaskStatus: (taskId, newIsDone) => changeTaskStatusHandler(taskId, newIsDone),
};

// Пример овыполненой задачи
export const TaskCompletedExample = Template.bind({});
TaskCompletedExample.args = {
    task: {
        id: '2',
        title: 'Learn JS',
        isDone: true,
    },
    removeTask: removeTaskHandler,
    changeTaskTitle: (taskId, newTitle) => changeTaskTitleHandler(taskId, newTitle),
    changeTaskStatus: (taskId, newIsDone) => changeTaskStatusHandler(taskId, newIsDone),
};