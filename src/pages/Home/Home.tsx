import { useState, useEffect } from 'react';
import BookCard from '../../components/BookCard';
import { Book, mapBookFromApi } from '../../types/book';
import { bookService, BookSortBy, SortOrder } from '../../services/bookService';
import './Home.css';

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const booksFromApi = await bookService.findAll({
          sortBy: BookSortBy.POPULARITY,
          sortOrder: SortOrder.DESC,
        });
        
        const mappedBooks = booksFromApi.map(mapBookFromApi);
        
        setBooks(mappedBooks);
      } catch (err) {
        console.error('Erro ao buscar livros:', err);
        setError(
          err instanceof Error 
            ? err.message 
            : 'Erro ao carregar livros. Verifique se a API está rodando.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando livros...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2>Erro ao carregar livros</h2>
        <p>{error}</p>
        <button 
          className="retry-button" 
          onClick={() => window.location.reload()}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="empty-container">
        <div className="empty-icon">📚</div>
        <h2>Nenhum livro encontrado</h2>
        <p>Adicione livros através da API para começar a visualizar aqui.</p>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="home-container">
        <section className="hero-section">
          <h1 className="hero-title">Obras Literárias Brasileiras</h1>
          <p className="hero-subtitle">
            Descubra e catalogue os melhores livros da literatura nacional
          </p>
        </section>

        <section className="books-section">
          <div className="section-header">
            <h2>Livros Populares</h2>
            <p className="section-subtitle">
              {books.length} {books.length === 1 ? 'livro encontrado' : 'livros encontrados'}
            </p>
          </div>

          <div className="books-grid">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
