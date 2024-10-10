import React from 'react'
import {Meta, StoryFn} from "@storybook/react";
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator'
import AppWithRedux from "../AppWithRedux";



const meta: Meta<typeof AppWithRedux> = {
    title: 'TodoList/AppWithReduxComponent',
    component: AppWithRedux,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator], // Декоратор для обертывания в Redux Provider
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

// Определяем историю с добавлением элемента
const Template: StoryFn = (args) => <AppWithRedux {...args} />;

// Пример обычного состояния
export const AppWithReduxBaseExample = Template.bind({});
AppWithReduxBaseExample.args = {
    // Здесь можно добавить пропсы, если они есть
};