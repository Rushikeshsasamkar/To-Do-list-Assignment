// AddTodoForm.js
import React, { useState } from 'react';

const AddTodoForm = ({ onAddTodo }) => {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleAddTodo = (e) => {
        if (e.key === 'Enter' && inputText.trim() !== '') {
            onAddTodo(inputText);
            setInputText('');
        }
    };

    return (
        <input
            style={{ borderRadius: "10px", border: 'ActiveBorder' }}
            type="text"
            placeholder="Add a new TODO"
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleAddTodo}
        />
    );
};

export default AddTodoForm;
