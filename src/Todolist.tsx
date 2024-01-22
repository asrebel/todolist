import React from "react";
import {FilterValues} from "./App";

type TaskProps = {
    id: number
    title: string
    isDone: boolean
}

type TodolistProps = {
    title: string
    tasks: TaskProps[]
    removeTask: (taskID: number) => void
    changeFilter: (value: FilterValues) => void
}

export const Todolist = (props: TodolistProps) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((task: TaskProps) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => {
                                props.removeTask(task.id)
                            }}>✖️
                            </button>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}