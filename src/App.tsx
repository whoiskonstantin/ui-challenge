import React from 'react'
import './App.css'
import CreateInput from './components/CreateInput'
import List from './components/List'
import { mockApiRequest } from './utils'
import CompletedCount from './components/CompletedCount'
import { Task } from './types'

function App() {
  // State
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)

  const addTask = async () => {
    const title = newTaskTitle.trim()

    if (!title) return

    const newTask = { id: Date.now(), title, completed: false }

    try {
      // Save task to the server
      const savedTask = await mockApiRequest(newTask)
      setTasks((prev) => [...prev, savedTask])
      setNewTaskTitle('')
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const toggleComplete = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value)
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <CompletedCount tasks={tasks} />
      <div className="input-container">
        <CreateInput newTaskTitle={newTaskTitle} onChange={handleOnChange} />
        <button onClick={addTask}>Add Task</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <List tasks={tasks} toggleComplete={toggleComplete} />
    </div>
  )
}

export default App
