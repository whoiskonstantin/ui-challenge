import { Task } from '../types'
import { renderLogger } from '../utils'

interface Props {
  tasks: Task[]
  toggleComplete: (id: number) => void
}

const List = ({ tasks, toggleComplete }: Props) => {
  renderLogger('List')
  return (
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
  )
}

export default List
