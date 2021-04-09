import React from 'react';
import Vote from "./Vote"


const VoteList = ({ todos, setTodos, filteredTodos, pagesVisited, usersPerPage }) => {
    return (
        
        <div className="c-todo-container">
            <ul className="c-todo-list list-group">
                {filteredTodos
                .slice(pagesVisited, pagesVisited + usersPerPage)
                .map((todo, index) => (
                    <Vote
                        setTodos={setTodos}
                        todos={todos}
                        key={todo.id}
                        todo={todo}
                        text={todo.text}
                        link={todo.link}
                        score={todo.score}
                        index={index}
                    />
                ))}
            </ul>
        </div>
    )
}

export default VoteList;