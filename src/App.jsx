import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import TaskForm from './components/TaskForm'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/add-task' element={<TaskForm />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
