import { useState } from "react";
import UserBookListService from "../../services/userBookListService";
import { Book } from "../../types/book";
import "./ModalAddBook.css";

interface ModalAddBookProps {
  book: Book;
  onClose: () => void;
}

const ModalAddBook = ({ book, onClose }: ModalAddBookProps) => {
  const [status, setStatus] = useState("reading");
  const [rating, setRating] = useState<number | "">("");
  const [progress, setProgress] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      console.log("Status:", status);

      await UserBookListService.addBookToUserList({
        bookId: book.id,
        status,
        rating: rating === "" ? undefined : Number(rating),
        progress: progress === "" ? undefined : Number(progress),
      });

      onClose();
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Adicionar "{book.title}"</h3>

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="reading">Lendo</option>
          <option value="completed">Concluído</option>
          <option value="planned">Planejado</option>
          <option value="dropped">Abandonado</option>
          <option value="on_hold">Em pausa</option>
        </select>

        <label>Nota (1 a 10)</label>
        <input
          type="number"
          min={1}
          max={10}
          value={rating}
          onChange={(e) =>
            setRating(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <label>Progresso</label>
        <input
          type="number"
          min={0}
          value={progress}
          onChange={(e) =>
            setProgress(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddBook;
