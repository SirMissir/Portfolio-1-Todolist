import {addTodoListAC, todolistsReducer} from "./todolists-reducer";
import {TaskStateType, TodoListType} from "../App";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodolistsState: Array<TodoListType> = []

    const action = addTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.feedId)
    expect(idFromTodolists).toBe(action.payload.feedId)
})

