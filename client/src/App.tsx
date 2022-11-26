import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './contexts/UserContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Welcome from './pages/Welcome'

function App() {
  function isLogged() {
    const re = /jwt/g
    return re.test(document.cookie)
  }

  return (
    <UserProvider>
    <div className="w-screen min-h-screen bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
      <Routes>
        <Route path="/" element={ <Welcome /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/login" element={ !isLogged() ? <Login /> : <Navigate to="/home" /> } />
        <Route path="/signup" element={ !isLogged() ? <Signup /> : <Navigate to="/home" /> } />
      </Routes>
      <ToastContainer />
    </div>
    </UserProvider>
  )
}

export default App
