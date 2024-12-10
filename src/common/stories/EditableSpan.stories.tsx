import React from 'react';
import { Meta, StoryFn } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import EditableSpan from "../components/EditableSpan/EditableSpan"; // Импортируем action из addon-actions



const meta: Meta<typeof EditableSpan> = {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args:{
        title: 'Title',
        changeTitle: action('Change Title'),
    },
};

export default meta;

// Определяем историю с добавлением элемента
const Template: StoryFn<{
    title: string;
    changeTitle: (newTitle: string) => void;
}> = (args) => <EditableSpan {...args} />;

// Обработчики для действий
const changeTaskTitleHandler = action('Change Title');

// Пример обычного состояния
export const EditableSpanBaseExample = Template.bind({});
EditableSpanBaseExample.args = {
    title: 'Title', // Заголовок по умолчанию
    changeTitle:changeTaskTitleHandler // Передаем обработчик изменения заголовка
};
