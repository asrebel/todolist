import React, {useState} from 'react';
import './App.css';
import {TaskProps, Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValues = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValues
}

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(el=>el.id !== todoListID))
        delete tasks[todoListID]
    }

    const removeTask = (todoListID: string, taskId: string) => {
        setTasks({...tasks, [todoListID]:tasks[todoListID].filter(el=> el.id !==taskId)})
    }
    const addTask = (todoListID: string, title: string) => {
        const newTask: TaskProps = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListID]: [...tasks[todoListID], newTask]})
    }

    const changeTaskStatus = (todoListID: string, taskId: string, isDone: boolean) => {
       setTasks({...tasks, [todoListID]: tasks[todoListID].map(el=>el.id ===taskId ? {...el, isDone}:el)})
    }

    return (
        <div className="App">
            {todoLists.map(el => {

                let tasksForTodoList = tasks[el.id]

                if (el.filter === 'active') {
                    tasksForTodoList = tasks[el.id].filter(t => !t.isDone)
                }

                if (el.filter === 'completed') {
                    tasksForTodoList = tasks[el.id].filter(t => t.isDone)
                }


                return (
                    <Todolist
                        key={el.id}
                        todoListID={el.id}
                        title={el.title}
                        tasks={tasksForTodoList}
                        removeTodoList={removeTodoList}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                    />
                )
            })}

        </div>
    );
}

export default App;
