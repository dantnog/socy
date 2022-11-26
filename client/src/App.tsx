import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Welcome from './pages/Welcome'

function App() {
  return (
    <div className="w-screen min-h-screen bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
      <Routes>
        <Route path="/" element={ <Welcome /> } />
        <Route path="/home" element={ <div>HOME</div> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default App
