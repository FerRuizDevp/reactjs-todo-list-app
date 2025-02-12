import { useState, useEffect } from 'react'
import useLocalStorage from "use-local-storage";
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import Toggle from './components/Toggle'
import './App.css'


function App() {
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
      persistData(newTodoList)
      setTodos(newTodoList) 
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()  //Prevent from Submission
      handleAddTodos(todoValue)
      setTodoValue('')
    }
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }

    console.log(localTodos)
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)

  }, [])


  return (
    <>
      <div className="main-container" data-theme={isDark ? "dark" : "Light"}>
        <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} handleKeyDown={handleKeyDown} />
        <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} />
      </div>
      
    </>
  )
}

export default App  