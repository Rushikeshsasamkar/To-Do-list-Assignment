// App.js
import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import AddTodoForm from './Component/AddTodoForm';
import DisplayList from './Component/DisplayList';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    localforage.getItem('todos').then((savedTodos) => {
      if (savedTodos) {
        setTodos(savedTodos);
      }
    });
  }, []);

  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdTime: new Date().toISOString(),
    };

    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    localforage.setItem('todos', updatedTodos);
  };

  const handleToggleComplete = (id) => {
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

  const timeDifference = (current, previous) => {
    const millisecondsPerMinute = 60 * 1000;
    return Math.round((current - previous) / millisecondsPerMinute) + ' minutes';
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
      <div className='todoCompleteCard'>
        <AddTodoForm onAddTodo={handleAddTodo} />
        <DisplayList todos={todos} onToggleComplete={handleToggleComplete} timeDifference={timeDifference} />
      </div>
    </div>
  );
};

export default App;
