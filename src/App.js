import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    localforage.getItem('todos').then((savedTodos) => {
      if (savedTodos) {
        setTodos(savedTodos);
      }
    });
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = (e) => {
    if (e.key === 'Enter' && inputText.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputText,
        completed: false,
        createdTime: new Date().toISOString(), // Add creation timestamp
      };

      const updatedTodos = [newTodo, ...todos];
      setTodos(updatedTodos);
      localforage.setItem('todos', updatedTodos);
      setInputText('');
    }
  };

  const handleCompleteTodo = (id) => {
    const todoToToggle = todos.find((todo) => todo.id === id);

    if (todoToToggle && !todoToToggle.completed) {
      const completedTime = new Date().toISOString();
      const updatedTodos = todos.map((todo) =>
        todo.id === id
          ? {
            ...todo,
            completed: true,
            completedTime,
          }
          : todo
      );
      setTodos(updatedTodos);
      localforage.setItem('todos', updatedTodos);
    }
  };

  const handleReset = () => {
    setTodos([]);
    localforage.removeItem('todos');
  };

  return (
    <div className="App">
      <div className="header">
        <h1>TODO App</h1>
        <button className="reset-button" onClick={handleReset}>
          <span role="img" aria-label="reset">🔄</span>
          Reset
        </button>
      </div>
      <div className='todoCompleteCard' >
        <input
          style={{ borderRadius: "10px", border: 'ActiveBorder' }}
          type="text"
          placeholder="Add a new TODO"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleAddTodo}
        />
        <div className="todos-container">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-card ${todo.completed ? 'completed' : ''}`}
              onClick={() => handleCompleteTodo(todo.id)}
            >
              <div style={{ fontSize: 20, fontWeight: "600" }} >{todo.text}</div>
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
      </div>
    </div>
  );
};

export default App;

// Helper function to calculate time difference in minutes
const timeDifference = (current, previous) => {
  const millisecondsPerMinute = 60 * 1000;
  return Math.round((current - previous) / millisecondsPerMinute) + ' minutes';
};
