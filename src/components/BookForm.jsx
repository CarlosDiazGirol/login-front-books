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
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0] || null)
  }

  // Se activa cuando el archivo entra en la zona de drop.
  const handleDragEnter = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  // Se activa mientras el archivo se mueve por encima de la zona.
  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  // Se activa cuando el archivo sale de la zona de drop.
  const handleDragLeave = (event) => {
    event.preventDefault()
    setIsDragging(false)
  }

  // Se activa cuando se suelta el archivo y lo guarda en el estado.
  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)

    const file = event.dataTransfer.files[0]

    if (!file) {
      return
    }

    setImage(file)

    if (fileInputRef.current) {
      const files = event.dataTransfer.files
      fileInputRef.current.files = files
    }
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
          <label
            className={`upload-dropzone${isDragging ? ' is-dragging' : ''}`}
            htmlFor="image"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <span className="upload-dropzone-title">Arrastra una imagen aqui</span>
            <span className="upload-dropzone-text">o pulsa para abrir tu ordenador</span>
            {image ? <span className="upload-dropzone-file">Imagen seleccionada: {image.name}</span> : null}
          </label>
          <input accept="image/*" className="upload-input" id="image" name="image" onChange={handleImageChange} ref={fileInputRef} type="file" />
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