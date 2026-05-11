import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import useAuth from '../context/useAuth.js'

function LoginPage() {
  const navigate = useNavigate()
  const { error, login, setError } = useAuth()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData)
      navigate('/books')
    } catch {
      return
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="page">
        <section className="page-heading">
          <h1>Login</h1>
          <p>Conectado como: no conectado</p>
        </section>

        <article className="block block-narrow">
          <h2>Login</h2>

          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="field-wide">
              <label htmlFor="login-username">Username</label>
              <input id="login-username" name="username" onChange={handleChange} required value={formData.username} />
            </div>

            <div className="field-wide">
              <label htmlFor="login-password">Password</label>
              <input id="login-password" name="password" onChange={handleChange} required type="password" value={formData.password} />
            </div>

            <div className="form-actions field-wide">
              <button className="primary-button" disabled={loading} type="submit">
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>

          {error ? <div className="feedback error">{error}</div> : null}

          <p className="auth-footer">
            Si aun no tienes cuenta, ve a <Link to="/register">register</Link>.
          </p>
        </article>
      </main>
    </>
  )
}

export default LoginPage