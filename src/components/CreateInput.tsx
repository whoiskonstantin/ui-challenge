interface Props {
  newTaskTitle: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CreateInput = ({ newTaskTitle, onChange }: Props) => {
  return <input type="text" value={newTaskTitle} onChange={onChange} placeholder="Enter a new task" />
}

export default CreateInput
