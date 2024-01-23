import React from "react";
import {Button} from "./Button";
import {FilterValues} from "./App";


export type TaskProps = {
    id: number
    title: string
    isDone: boolean
}

type TodolistProps = {
    title: string
    tasks: Array<TaskProps>
    removeTask: (taskId: number) => void
    changeTodolistFilter:(filter:FilterValues)=>void
}

export const Todolist: React.FC<TodolistProps> = (
    {
        title,
        tasks,
        removeTask,
        changeTodolistFilter,
    }) => {

    const tasksItems: JSX.Element = tasks.length !== 0
        ? <ul>
            {tasks.map(task => {
                return (
                    <li key={task.id}>
                        <input type='checkbox'
                               checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button title='X' onClickHandler={() => removeTask(task.id)}/>
{/*
                        <button onClick={() => removeTask(task.id)}>X</button>
*/}
                    </li>
                )
            })}
        </ul>
        : <span>Bye bye!</span>


    return (
        <div className={'todolist'}>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title='+' onClickHandler={()=>{}}/>
            </div>
            {tasksItems}
            <div>
                <Button title='All' onClickHandler={()=>changeTodolistFilter('all')}/>
                <Button title='Active' onClickHandler={()=>changeTodolistFilter('active')}/>
                <Button title='Completed' onClickHandler={()=>changeTodolistFilter('completed')}/>
            </div>
        </div>
    )
}