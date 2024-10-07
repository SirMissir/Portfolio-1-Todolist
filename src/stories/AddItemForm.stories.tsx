import React from 'react';
import { Meta, StoryFn } from "@storybook/react";
import { action } from '@storybook/addon-actions'; // Импортируем action из addon-actions
import AddItemForms from "../AddItemForms";

const meta: Meta<typeof AddItemForms> = {
    title: 'Todolist/AddItemForm',
    component: AddItemForms,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        addItem: action("Button 'add' was pressed inside the form"), // Используем action здесь
    },
};

export default meta;

// Определяем историю с добавлением элемента
const Template: StoryFn<{ addItem: (title: string) => void }> = (args) => <AddItemForms {...args} />;

export const AddItemFormBaseExample = Template.bind({});
AddItemFormBaseExample.args = {
    addItem: action("Button 'add' was pressed inside the form"), // Передаем action в args
};