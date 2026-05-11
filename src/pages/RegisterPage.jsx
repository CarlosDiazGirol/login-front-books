import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import useAuth from '../context/useAuth.js'

function RegisterPage() {
  const navigate = useNavigate()
  const { error, register, setError } = useAuth()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
      await register(formData)
      setSuccess('Usuario creado. Ahora puedes hacer login.')
      setTimeout(() => navigate('/login'), 900)
    } catch {
      return
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="page">
        <section className="page-heading">
          <h1>Register</h1>
          <p>Conectado como: no conectado</p>
        </section>

        <article className="block block-narrow">
          <h2>Register</h2>

          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="field-wide">
              <label htmlFor="register-username">Username</label>
              <input id="register-username" name="username" onChange={handleChange} required value={formData.username} />
            </div>

            <div className="field-wide">
              <label htmlFor="register-password">Password</label>
              <input id="register-password" name="password" onChange={handleChange} required type="password" value={formData.password} />
            </div>

            <div className="form-actions field-wide">
              <button className="primary-button" disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Creando...' : 'Crear cuenta'}
              </button>
            </div>
          </form>

          {error ? <div className="feedback error">{error}</div> : null}
          {success ? <div className="feedback success">{success}</div> : null}

          <p className="auth-footer">
            Si ya tienes cuenta, vuelve a <Link to="/login">login</Link>.
          </p>
        </article>
      </main>
    </>
  )
}

export default RegisterPage