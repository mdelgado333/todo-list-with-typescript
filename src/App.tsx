import React, {FC, ChangeEvent, useState} from 'react';
import './App.css'
import { ITask } from './interfaces'
import TodoTask from './TodoTask'

const App: FC = () => {

  const [task, setTask] = useState<string>("")
  const [deadline, setDeadline] = useState<number>(0)
  const [todoList, setTodoList] = useState<ITask[]>([])
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target
    if (name === "task"){
      setTask(value)
    } else {
      setDeadline(Number(value))
    }
  }

  const addTask = (): void => {
    const newTask = { 
      taskName: task, 
      deadline: deadline 
    }
    setTodoList([...todoList, newTask])
    setTask("")
    setDeadline(0)
  }

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName != taskNameToDelete
    }))
  }

  return (
  <div className="App">
    <div className='header'>
      <div className='inputcontainer'>
        <input type="text" placeholder="Task..." name="task" value={task} onChange={handleChange}/>
          <input type="number" placeholder="Deadline (in Days)..." value={deadline} onChange={handleChange}/>
      </div>
      <button onClick={addTask}>Add task</button>
    </div>
    <div className='todoList'>
      {todoList.map((task: ITask, key: number) => {
      return <TodoTask key={key} task={task} completeTask={completeTask}/>
      })}
    </div>
  </div>
  );
}

export default App;
