import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {FilterValues} from "./App";


export type TaskProps = {
    id: string
    title: string
    isDone: boolean
}

type TodolistProps = {
    title: string
    tasks: Array<TaskProps>
    removeTask: (taskId: string) => void
    addTask: (title: string)=>void
}

export const Todolist: React.FC<TodolistProps> = (
    {
        title,
        tasks,
        removeTask,
        addTask,
    }) => {

    const [filter, setFilter] = useState<FilterValues>('all')
    const [taskTitle, setTaskTitle] = useState('')
    const changeTodolistFilter = (filter: FilterValues) => {
        setFilter(filter)
    }
    const addNewTaskHandler = ()=>{
        addTask(taskTitle)
        setTaskTitle('')
    }

    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>)=>setTaskTitle(e.currentTarget.value)
    const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>)=>e.key === 'Enter' && addNewTaskHandler()
    const changeFilterHandlerCreator = (filter: FilterValues)=>{
        return ()=>changeTodolistFilter(filter)
    }

    const tasksForTodolist: Array<TaskProps> = filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks

    const tasksItems: JSX.Element = tasks.length !== 0
        ? <ul>
            {tasksForTodolist.map(task => {
                const removeTaskHandler = () => removeTask(task.id)
                return (
                    <li key={task.id}>
                        <input type='checkbox'
                               checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button title='X' onClickHandler={removeTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <span>Bye bye!</span>


    return (
        <div className={'todolist'}>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={setTaskTitleHandler}
                    onKeyDown={addTaskOnKeyDownHandler}
                />
                <Button title='+'
                        isDisabled={!taskTitle || taskTitle.length > 15}
                        onClickHandler={addNewTaskHandler}/>
                {taskTitle.length > 15 && <div style={{color:'red'}}>Не более 15 символов.</div>}
            </div>
            {tasksItems}
            <div>
                <Button title='All' onClickHandler={changeFilterHandlerCreator('all')}/>
                <Button title='Active' onClickHandler={changeFilterHandlerCreator('active')}/>
                <Button title='Completed' onClickHandler={changeFilterHandlerCreator('completed')}/>
            </div>
        </div>
    )
}