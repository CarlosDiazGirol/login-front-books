import { Navigate } from 'react-router-dom'
import useAuth from '../context/useAuth.js'

function HomeRedirect() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <main className="page page-simple">
        <section className="status-card">
          <p>Cargando sesion...</p>
        </section>
      </main>
    )
  }

  
  return <Navigate to={user ? '/books' : '/login'} replace />
}

export default HomeRedirect