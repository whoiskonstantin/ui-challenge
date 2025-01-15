import { Task } from '../types'
import { renderLogger } from '../utils'

interface Props {
  tasks: Task[]
}

const CompletedCount = ({ tasks }: Props) => {
  renderLogger('CompletedCount')

  // TODO: Calculate the number of completed tasks
  const completedCount = 0
  return (
    <p>
      Completed: {completedCount}/{tasks.length}
    </p>
  )
}

export default CompletedCount
