import React from 'react';
import './App.css';
import {TaskProps, Todolist} from "./Todolist";


function App() {
    const tasks: Array<TaskProps> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: false},
        {id: 3, title: 'JS/TS', isDone: false},
        {id: 4, title: 'React', isDone: false},
    ]

    const todoListTitle = 'What to learn'

    return (
        <div className="App">
            <Todolist title={todoListTitle}
                      tasks={tasks}/>
        </div>
    );
}

export default App;
