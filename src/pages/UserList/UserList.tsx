import userBookListService from "@/services/userBookListService";
import { Book } from "@/types/book";
import { useEffect, useState } from "react";
import "./UserList.css";

const UserList = () => {
  const [userBookList, setUserBookList] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserBookList = async (): Promise<void> => {
    try {
      const data: Book[] = await userBookListService.getUserBookList();
      setUserBookList(data);
    } catch (error) {
      console.error("Erro ao buscar lista de livros do usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserBookList();
  }, []);

  return (
    <div className="user-list">
      <div className="user-list-container">
        <section className="user-hero-section">
          <h1 className="user-hero-title">Minha Lista</h1>
          <p className="user-hero-subtitle">
            Acompanhe e gerencie sua coleção pessoal de leitura
          </p>
        </section>

        <section className="user-section">
          <div className="user-section-header">
            <h2>Sua coleção</h2>
            <span className="user-section-subtitle">
              {userBookList.length} livro(s)
            </span>
          </div>

          {loading && (
            <div className="user-loading-container">
              <div className="user-loading-spinner" />
              <p>Carregando seus livros...</p>
            </div>
          )}

          {!loading && userBookList.length === 0 && (
            <div className="user-empty-container">
              <div className="user-empty-icon">📚</div>
              <h2>Nenhum livro encontrado</h2>
              <p>Você ainda não adicionou livros à sua lista.</p>
            </div>
          )}

          {!loading && userBookList.length > 0 && (
            <div className="user-grid">
              {userBookList.map((book) => (
                <div key={book.id} className="user-card">
                  {book.coverImageUrl ? (
                    <img 
                      src={book.coverImageUrl} 
                      alt={book.title}
                      className="user-book-cover"
                    />
                  ) : (
                    <div className="user-avatar">
                      {book.title?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="user-name">{book.title}</div>

                  <div className="user-email">
                    {book.authors?.map(a => a.name).join(", ") || "Autor desconhecido"}
                  </div>

                  <div className="user-actions">
                    <button className="user-button user-button-primary">
                      Ver
                    </button>
                    <button className="user-button user-button-secondary">
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserList;