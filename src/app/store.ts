import { tasksReducer } from '../feauters/todolists/model/tasks-reducer'
import { todolistsReducer } from '../feauters/todolists/model/todolists-reducer'
import {combineReducers,legacy_createStore as createStore} from 'redux'
import {appReducer} from "./app-reducer";


export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
})

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
//  это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
