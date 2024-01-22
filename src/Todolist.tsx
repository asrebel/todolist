import React from "react";
import {Button} from "./Button";


export type TaskProps = {
    id: number
    title: string
    isDone: boolean
}

type TodolistProps = {
    title: string
    tasks: Array<TaskProps>
}

export const Todolist: React.FC<TodolistProps> = (
    {
        title,
        tasks
    }) => {

    const tasksItems: JSX.Element = tasks.length !== 0
        ? <ul>
            {tasks.map(task => {
                return (
                    <li key={task.id}>
                        <input type='checkbox'
                               checked={task.isDone}/>
                        <span>{task.title}</span>
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
                <Button title='+'/>
            </div>
            {tasksItems}
            <div>
                <Button title='All'/>
                <Button title='Active'/>
                <Button title='Completed'/>
            </div>
        </div>
    )
}