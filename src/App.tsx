import React, {useState} from 'react';
import './App.css';
import {TaskProps, Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValues = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle = 'What to learn'
    const [tasks, setTasks] = useState<Array<TaskProps>>(
        [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS/TS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ]
    )

    const removeTask = (taskId: string) => {
        const nextState: Array<TaskProps> = tasks.filter(task => task.id !== taskId)
        setTasks(nextState)
    }

    const addTask = (title: string) => {
        const newTask: TaskProps = {id: v1(),title,isDone: false}
        setTasks([newTask, ...tasks])
    }

    return (
        <div className="App">
            <Todolist title={todoListTitle}
                      tasks={tasks}
                      removeTask={removeTask}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
