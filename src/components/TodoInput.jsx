import React from 'react'

function TodoInput(props) {
    const { handleAddTodos, todoValue, setTodoValue, handleKeyDown } = props

    return (
        <header>
            <input value={todoValue} onChange={(e) => {
                setTodoValue(e.target.value)
            }} onKeyDown={handleKeyDown} placeholder='Enter To-Do...' />
            <button onClick={() => {
                handleAddTodos(todoValue)
                setTodoValue('')
            }}>ADD</button>
        </header>
    )
}

export default TodoInput
