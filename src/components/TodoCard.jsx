import React from 'react'

function TodoCard(props) {
    const { children, index, handleDeleteTodo, handleEditTodo } = props      

    return (      
        <li className='todoItem'>
            { children }
            <div className='actionsContainer'>
                <button onClick={() => {handleEditTodo(index)}}>
                    <i className="fa-regular fa-pen-to-square"></i> 
                </button>
                <button onClick={() => {handleDeleteTodo(index)}}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>    
        </li>    
    )
}

export default TodoCard

