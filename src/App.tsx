import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Define the Task type
type Task = {
  id: number
  title: string
  completed: boolean
}

// Mock API function
const mockApiRequest = async (task: Task): Promise<Task> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 1 / 3) {
        reject(new Error('Failed to save task. Please try again.'))
      } else {
        resolve(task)
      }
    }, 1000)
  })
}

function App() {
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)

  const addTask = React.useCallback(async () => {
    if (!newTaskTitle.trim()) return

    const newTask: Task = { id: Date.now(), title: newTaskTitle.trim(), completed: false }

    try {
      const savedTask = await mockApiRequest(newTask)
      setTasks((prev) => [...prev, savedTask])
      setNewTaskTitle('')
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    }
  }, [newTaskTitle])

  const toggleComplete = React.useCallback(
    (id: number) => {
      setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
    },
    [setTasks]
  )

  console.log('App render')

  const completedCount = React.useMemo(() => tasks.filter((task) => task.completed).length, [tasks])

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => toggleComplete(task.id)}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {task.title}
            </span>
          </li>
        ))}
      </ul>
      <p>
        {completedCount}/{tasks.length} tasks completed
      </p>
    </div>
  )
}

export default App
