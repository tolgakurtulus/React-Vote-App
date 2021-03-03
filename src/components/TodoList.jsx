import React from 'react';
import Todo from "./Todo"

const TodoList = ({ todos, setTodos, filteredTodos }) => {
    return (
        
        <div className="c-todo-container">
            <ul className="c-todo-list list-group">
                {filteredTodos.map(todo => (
                    <Todo
                        setTodos={setTodos}
                        todos={todos}
                        key={todo.id}
                        todo={todo}
                        text={todo.text}
                    />
                ))}
            </ul>
        </div>
    )
}

export default TodoList;