import { Book } from '../../types/book';
import './BookCard.css';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="book-card">
      <div className="book-card-image">
        <img 
          src={book.coverImageUrl || '/placeholder-book.jpg'} 
          alt={book.title}
        />
        {book.score && (
          <div className="book-score">
            <span className="score-value">{book.score.toFixed(1)}</span>
          </div>
        )}
      </div>
      
      <div className="book-card-content">
        <h3 className="book-title">{book.title}</h3>
        
        {book.type && (
          <div className="book-type">{book.type.replace(/_/g, ' ')}</div>
        )}
        
        <div className="book-authors">
          {book.authors.map((author, index) => (
            <span key={author.id}>
              {author.name}
              {index < book.authors.length - 1 && ', '}
            </span>
          ))}
        </div>
        
        <div className="book-stats">
          {book.rank && (
            <div className="stat">
              <span className="stat-label">Rank</span>
              <span className="stat-value">#{book.rank}</span>
            </div>
          )}
          {book.popularity !== undefined && (
            <div className="stat">
              <span className="stat-label">Popularidade</span>
              <span className="stat-value">{book.popularity}</span>
            </div>
          )}
          {book.totalReviews !== undefined && (
            <div className="stat">
              <span className="stat-label">Avaliações</span>
              <span className="stat-value">{book.totalReviews}</span>
            </div>
          )}
        </div>
        
        <div className="book-genres">
          {book.genres.slice(0, 3).map(genre => (
            <span key={genre.id} className="genre-tag">
              {genre.name}
            </span>
          ))}
        </div>
        
        {book.synopsis && (
          <p className="book-synopsis">
            {book.synopsis.length > 150 
              ? `${book.synopsis.substring(0, 150)}...` 
              : book.synopsis}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookCard;
