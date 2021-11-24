import { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './routes/About';



const App = () => {
  const [showAddTask, setShowAddTask] = useState(true)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])


// Fetch Tasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
    return data 
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

// Add Task
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])



  // const id = Math.floor(Math.random() * 1000) +1
  // const newTask = { id, ...task }
  // setTasks([ ...tasks, newTask ])
}

// Delete Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  })
  setTasks(tasks.filter((task) => task.id !==id))
}

// Toggle Reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method:'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })

  const data = await res.json()

  setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder } : task ))
}

  return(
    <BrowserRouter>
      <Routes>
            <div className='container'>
              <Header onAdd={() => setShowAddTask (!showAddTask)} showAdd={showAddTask} />
                <Route path="/" exact render={(props) => (
                  <>
                      {showAddTask && 
                      <AddTask onAdd={addTask} />
                      }
                      {tasks.length > 0 ? (
                        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                      ) : (
                          'No Tasks'
                          )
                      }
                  </>
                  )} 
                />
                <Route path="/about" element={<About/>} 
                />
              <Footer />
            </div>
      </Routes>
    </BrowserRouter>,
     document.getElementById("root")
  );
} 

export default App

