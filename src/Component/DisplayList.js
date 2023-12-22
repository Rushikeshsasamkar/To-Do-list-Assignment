// DisplayList.js
import React from 'react';

const DisplayList = ({ todos, onToggleComplete, timeDifference }) => {
    return (
        <div className="todos-container">
            {todos.map((todo) => (
                <div
                    key={todo.id}
                    className={`todo-card ${todo.completed ? 'completed' : ''}`}
                    onClick={() => onToggleComplete(todo.id)}
                >
                    <div style={{ fontSize: 20, fontWeight: "600" }}>{todo.text}</div>
                    {todo.completed && todo.completedTime && (
                        <div style={{
                            marginLeft: "55%",
                            fontSize: 13,
                            fontFamily: 'initial'
                        }}>
                            <span role="img" aria-label="completed">✅</span> Completed {timeDifference(new Date(), new Date(todo.completedTime))} ago
                        </div>
                    )}
                    {!todo.completed && todo.createdTime && (
                        <div style={{
                            fontSize: 13,
                            fontFamily: 'initial'
                        }}
                        > <span role="img" aria-label="clock">⏰</span> Created {timeDifference(new Date(), new Date(todo.createdTime))} ago</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DisplayList;
