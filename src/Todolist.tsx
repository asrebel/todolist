import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {FilterValues} from "./App";


export type TaskProps = {
    id: string
    title: string
    isDone: boolean
}

type TodolistProps = {
    todoListID: string
    title: string
    tasks: Array<TaskProps>
    removeTodoList: (todoListID: string) => void
    removeTask: (todoListID: string, taskId: string) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
}

export const Todolist: React.FC<TodolistProps> = (
    {
        todoListID,
        title,
        tasks,
        removeTodoList,
        removeTask,
        addTask,
        changeTaskStatus,
    }) => {

    const [filter, setFilter] = useState<FilterValues>('all')
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)
    const [isHide, setIsHide] = useState(false)

    const removeTodoListHandler = () => {removeTodoList(todoListID)}
    const toggleHideTodoList = () => setIsHide(!isHide)
    const changeTodolistFilter = (filter: FilterValues) => {
        setFilter(filter)
    }
    const addNewTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            addTask(todoListID, trimmedTaskTitle)
        } else {
            setError(true)
        }
        setTaskTitle('')
    }

    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(e.currentTarget.value)
    }
    const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewTaskHandler()
    const changeFilterHandlerCreator = (filter: FilterValues) => {
        return () => changeTodolistFilter(filter)
    }

    /* const tasksForTodolist: Array<TaskProps> = filter === 'active'
         ? tasks.filter(t => !t.isDone)
         : filter === 'completed'
             ? tasks.filter(t => t.isDone)
             : tasks*/

    const getFilteredTasks = (allTasks: Array<TaskProps>, filterValue: FilterValues) => {
        switch (filterValue) {
            case "active":
                return allTasks.filter(t => !t.isDone);
            case "completed":
                return allTasks.filter(t => t.isDone);
            default:
                return allTasks;
        }
    }

    const tasksForTodolist: Array<TaskProps> = getFilteredTasks(tasks, filter)

    const countActiveTasksForHideMode = isHide
    ? getFilteredTasks(tasks, 'active').length
        : null

    const tasksItems: JSX.Element = tasks.length !== 0
        ? <ul>
            {tasksForTodolist.map(task => {
                const removeTaskHandler = () => removeTask(todoListID, task.id)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todoListID, task.id, e.currentTarget.checked)

                return (
                    <li key={task.id}>
                        <input type='checkbox'
                               checked={task.isDone}
                               onChange={changeTaskStatusHandler}/>
                        <span className={task.isDone ? 'task-done' : 'task'}>{task.title}</span>
                        <Button title='X' onClickHandler={removeTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <span>Bye bye!</span>


    return (
        <div className={'todolist'}>
            <h3>
                {title}
                <Button title={isHide ? 'Show' : 'Hide'} onClickHandler={toggleHideTodoList}/>
                <Button title={'X'} onClickHandler={removeTodoListHandler}/>
            </h3>
            {isHide && <div>{`Количество активных задач: ${countActiveTasksForHideMode}`}</div>}
            {!isHide && <>
                <div>
                    <input
                        value={taskTitle}
                        onChange={setTaskTitleHandler}
                        onKeyDown={addTaskOnKeyDownHandler}
                        className={error ? 'task-input-error' : ''}
                    />
                    <Button title='+'
                            isDisabled={!taskTitle || taskTitle.length > 15}
                            onClickHandler={addNewTaskHandler}/>
                    {taskTitle.length > 15 && <div style={{color: 'red'}}>Не более 15 символов.</div>}
                    {error && <div style={{color: 'red'}}>Введите название таски.</div>}
                </div>
                {tasksItems}
                <div className={'filter-buttons'}>
                    <Button
                        title='All'
                        onClickHandler={changeFilterHandlerCreator('all')}
                        classes={filter === 'all' ? 'btn-active-filter' : 'btn-filter'}/>
                    <Button
                        title='Active'
                        onClickHandler={changeFilterHandlerCreator('active')}
                        classes={filter === 'active' ? 'btn-active-filter' : 'btn-filter'}/>

                    <Button
                        title='Completed'
                        onClickHandler={changeFilterHandlerCreator('completed')}
                        classes={filter === 'completed' ? 'btn-active-filter' : 'btn-filter'}/>
                </div>
            </>}
        </div>
    )
}