import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>Minha Estante Brasil</h1>
          </Link>
        </div>
        
        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Explorar Livros
          </Link>
          <Link 
            to="/my-books" 
            className={`navbar-link ${location.pathname === '/my-books' ? 'active' : ''}`}
          >
            Minha Lista
          </Link>
        </div>
        
        <div className="navbar-actions">
          {user && (
            <>
              <div className="user-info">
                <div className="user-avatar">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.username} />
                  ) : (
                    <span className="avatar-placeholder">
                      {user.username?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="user-name">{user.username}</span>
              </div>
              <button onClick={logout} className="logout-button">
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
