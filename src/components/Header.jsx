import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../context/useAuth.js'

function Header() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="header">
      <Link className="header-brand" to={user ? '/books' : '/login'}>
        Book Vault
      </Link>

      <nav className="header-nav">
        {user ? (
          <>
            <Link to="/books">Tus libros</Link>
            <button type="button" onClick={handleLogout}>
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header