import React, {useState} from 'react';
import './App.css';
import {TaskProps, Todolist} from "./Todolist";


export type FilterValues = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle = 'What to learn'
    const [tasks, setTasks] = useState<Array<TaskProps>>(
        [
            {id: 1, title: 'HTML', isDone: true},
            {id: 2, title: 'CSS', isDone: true},
            {id: 3, title: 'JS/TS', isDone: false},
            {id: 4, title: 'React', isDone: false},
        ]
    )

    const removeTask = (taskId: number) => {
        const nextState: Array<TaskProps> = tasks.filter(task => task.id !== taskId)
        setTasks(nextState)
    }
    const [filter, setFilter] = useState<FilterValues>('all')
    const changeTodolistFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    const tasksForTodolist: Array<TaskProps> = filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks


    return (
        <div className="App">
            <Todolist title={todoListTitle}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeTodolistFilter={changeTodolistFilter}
            />
        </div>
    );
}

export default App;
