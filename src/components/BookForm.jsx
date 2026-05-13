import { useRef, useState } from 'react'

const initialValues = {
  title: '',
  author: '',
  country: '',
  language: '',
  pages: '',
  year: '',
}

function BookForm({ onSubmit, isLoadingSubmit }) {
  const [formData, setFormData] = useState(initialValues)
  const [image, setImage] = useState(null)
  const fileInputRef = useRef(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0] || null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const didCreate = await onSubmit({ ...formData, image })

    if (didCreate) {
      setFormData(initialValues)
      setImage(null)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <section className="block">
      <h2>BookForm</h2>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="field-wide">
          <label htmlFor="title">Titulo</label>
          <input id="title" name="title" onChange={handleChange} required value={formData.title} />
        </div>

        <div className="field">
          <label htmlFor="author">Autor</label>
          <input id="author" name="author" onChange={handleChange} value={formData.author} />
        </div>

        <div className="field">
          <label htmlFor="country">Pais</label>
          <input id="country" name="country" onChange={handleChange} value={formData.country} />
        </div>

        <div className="field">
          <label htmlFor="language">Idioma</label>
          <input id="language" name="language" onChange={handleChange} value={formData.language} />
        </div>

        <div className="field">
          <label htmlFor="pages">Paginas</label>
          <input id="pages" min="0" name="pages" onChange={handleChange} type="number" value={formData.pages} />
        </div>

        <div className="field-wide">
          <label htmlFor="year">Año</label>
          <input id="year" name="year" onChange={handleChange} type="number" value={formData.year} />
        </div>

        <div className="field-wide">
          <label htmlFor="image">Imagen</label>
          <input accept="image/*" id="image" name="image" onChange={handleImageChange} ref={fileInputRef} type="file" />
        </div>

        <div className="form-actions field-wide">
          <button className="primary-button" disabled={isLoadingSubmit} type="submit">
            {isLoadingSubmit ? 'Guardando...' : 'Guardar libro'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default BookForm