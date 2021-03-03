import React from 'react';

const Form = ({ setInputText, todos, setTodos, inputText, setStatus }) => {

    const inputTextHandler = (e) => {
        setInputText(e.target.value)
    }

    const submitTodoHandler = (e) => {
        e.preventDefault();
        setTodos([
            ...todos,
            { text: inputText, completed: false, id: Math.random() * 100 },
        ]);
        setInputText("");
    }

    const statusHandler = (e) => {
        setStatus(e.target.value)
    }

    return (

        <form className="c-form">
            <input
                type="text"
                className="form-control c-todo-input"
                id="InputName"
                aria-describedby="emailHelp"
                placeholder="Todo Name"
                value={inputText}
                onChange={inputTextHandler}
            />
            <button onClick={submitTodoHandler} className="c-todo-button btn btn-dark" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
            <select className="form-select" aria-label="Default select example" onChange={statusHandler} name="todos" className="filter-todo form-select">
                <option value="all">All</option>
                <option value="completed">Complated</option>
                <option value="uncompleted">Uncomplated</option>
            </select>
        </form>
    )
}

export default Form;