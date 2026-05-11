import { useEffect, useState } from 'react'
import BookForm from '../components/BookForm.jsx'
import BookList from '../components/BookList.jsx'
import Header from '../components/Header.jsx'
import useAuth from '../context/useAuth.js'
import { createBook, deleteBook, getBooks } from '../services/api.js'

function BooksPage() {
  const { user } = useAuth()
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const [isDeletingId, setIsDeletingId] = useState(null)
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  const loadBooks = async () => {
    try {
      const data = await getBooks()
      setBooks(data)
    } catch (error) {
      setFeedback({ type: 'error', message: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const load = async () => await loadBooks()
    load()
  }, [])

  const handleAddBook = async (bookData) => {
    setFeedback({ type: '', message: '' })
    setIsLoadingSubmit(true)

    try {
      await createBook(bookData)
      setFeedback({ type: 'success', message: 'Libro guardado correctamente.' })
      await loadBooks()
      return true
    } catch (error) {
      setFeedback({ type: 'error', message: error.message })
      return false
    } finally {
      setIsLoadingSubmit(false)
    }
  }

  const handleDeleteBook = async (bookId) => {
    setFeedback({ type: '', message: '' })
    setIsDeletingId(bookId)

    try {
      await deleteBook(bookId)
      setBooks((currentBooks) => currentBooks.filter((book) => book.id !== bookId))
      setFeedback({ type: 'success', message: 'Libro eliminado correctamente.' })
    } catch (error) {
      setFeedback({ type: 'error', message: error.message })
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <>
      <Header />
      <main className="page">
        <section className="page-heading">
          <h1>Tus libros</h1>
          <p>Conectado como: {user?.username || 'no conectado'}</p>
        </section>

        {feedback.message ? <div className={`feedback ${feedback.type}`}>{feedback.message}</div> : null}

        <section className="books-grid">
        <div>
          <BookForm isLoadingSubmit={isLoadingSubmit} onSubmit={handleAddBook} />
        </div>

        <BookList books={books} isDeletingId={isDeletingId} isLoading={isLoading} onDelete={handleDeleteBook} />
        </section>
      </main>
    </>
  )
}

export default BooksPage