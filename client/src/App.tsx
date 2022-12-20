import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PostsProvider } from './contexts/PostsContext'
import { UserProvider } from './contexts/UserContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import User from './pages/User'
import Welcome from './pages/Welcome'

function App() {
  useEffect(() => {
    if (localStorage.getItem('dark') === 'true') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <UserProvider>
    <PostsProvider>
    <div className="w-screen min-h-screen bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
      <Routes>
        <Route path="/" element={ <Welcome /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/user/:id" element={ <User /> } />
      </Routes>
      <ToastContainer />
    </div>
    </PostsProvider>
    </UserProvider>
  )
}

export default App
