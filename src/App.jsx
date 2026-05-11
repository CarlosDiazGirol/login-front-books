import { Navigate, Route, Routes } from 'react-router-dom'
import GuestRoute from './components/GuestRoute.jsx'
import HomeRedirect from './components/HomeRedirect.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import BooksPage from './pages/BooksPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={(<GuestRoute><LoginPage /></GuestRoute>)}/>
      <Route path="/register" element={(<GuestRoute><RegisterPage /></GuestRoute>)}/>
      <Route path="/books" element={(<ProtectedRoute><BooksPage /></ProtectedRoute>)}/>
      {/* Si la ruta no existe, redirige a la ruta inicial sin añadir otra entrada al historial. */}
      <Route path="*" element={<Navigate to="/" replace />} /> 
    </Routes>
  )
}

export default App
