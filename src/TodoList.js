import React, { useState } from "react";
import Todo from "./Todo.js";
import NewTodoForm from "./NewTodoForm.js";

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    // add new todo
    const create = (newTodo) => {
        setTodos(todos => [...todos, newTodo]);
    };

    // update todo with updatedTask
    const update = (id, updatedTask) => {
        setTodos(todos =>
            todos.map(todo =>
                todo.id === id ? { ...todo, task: updatedTask } : todo)
        );
    };

    const remove = (id) => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    };

    const todoComponents = todos.map(todo => (
        <Todo
            remove={remove}
            key={todo.id}
            id={todo.id}
            task={todo.task}
            update={update}
        />
    ));

    return (
        <div>
            <NewTodoForm createTodo={create} />
            <ul>{todoComponents}</ul>
        </div>
    );
}

export default TodoList;