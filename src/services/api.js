import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  withCredentials: true,
})

const request = async (callback) => {
  try {
    const response = await callback()
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || 'Ha ocurrido un error con la API'
    throw new Error(message, { cause: error })
  }
}

export const registerUser = (payload) => request(() => api.post('/register', payload))
export const loginUser = (payload) => request(() => api.post('/login', payload))
export const getMe = () => request(() => api.get('/me'))
export const logoutUser = () => request(() => api.post('/logout'))

export const getBooks = () => request(() => api.get('/books'))
export const createBook = (payload) => {
  // FormData crea un body tipo multipart/form-data para poder enviar los datos del libro y tambien el archivo de imagen en la misma peticion.
  const formData = new FormData() 

  // Recorre cada campo del payload y solo anade los que tienen valor.
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      formData.append(key, value)
    }
  })

  return request(() => api.post('/books', formData))
}

export const deleteBook = (id) => request(() => api.delete(`/books/${id}`))

//Payload se usa como nombre común de argumento para mandar datos
