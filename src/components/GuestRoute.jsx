import { Navigate } from 'react-router-dom'
import useAuth from '../context/useAuth.js'

function GuestRoute({ children }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <main className="page page-simple">
        <section className="status-card">
          <p>Comprobando acceso...</p>
        </section>
      </main>
    )
  }

  if (user) {
    return <Navigate to="/books" replace />
  }

  return children
}

export default GuestRoute