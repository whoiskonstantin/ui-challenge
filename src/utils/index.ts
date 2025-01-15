import { Task } from '../types'

// Mock API function
export const mockApiRequest = async (task: Task): Promise<Task> => {
  const failRate = 1 / 100
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failRate) {
        reject(new Error('Failed to save task. Please try again.'))
      } else {
        resolve(task)
      }
    }, 1500)
  })
}

export const renderLogger = (componentName: string) => {
  console.log(`%c${componentName}.tsx render 🔄`, 'color: red; font-weight: bold; font-size: 14px;')
}
