import { useState, FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login: authLogin, register: authRegister } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegisterMode) {
        if (!username || !email || !password) {
          setError('Todos os campos são obrigatórios');
          setIsLoading(false);
          return;
        }
        await authRegister({ username, email, password });
      } else {
        if (!login || !password) {
          setError('Login e senha são obrigatórios');
          setIsLoading(false);
          return;
        }
        await authLogin({ login, password });
      }
    } catch (err) {
      console.error('Erro de autenticação:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao fazer login. Verifique suas credenciais.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setError('');
    setLogin('');
    setPassword('');
    setUsername('');
    setEmail('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-logo">Minha Estante Brasil</h1>
            <p className="login-subtitle">
              {isRegisterMode ? 'Crie sua conta' : 'Entre na sua conta'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            {isRegisterMode ? (
              <>
                <div className="form-group">
                  <label htmlFor="username">Nome de usuário</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Escolha um nome de usuário"
                    disabled={isLoading}
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password-register">Senha</label>
                  <input
                    type="password"
                    id="password-register"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Crie uma senha segura"
                    disabled={isLoading}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="login">E-mail ou usuário</label>
                  <input
                    type="text"
                    id="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="Digite seu e-mail ou usuário"
                    disabled={isLoading}
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Senha</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    disabled={isLoading}
                  />
                </div>
              </>
            )}

            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner-inline"></span>
              ) : (
                isRegisterMode ? 'Criar conta' : 'Entrar'
              )}
            </button>
          </form>

          <div className="toggle-mode">
            {isRegisterMode ? (
              <p>
                Já tem uma conta?{' '}
                <button 
                  type="button" 
                  onClick={toggleMode} 
                  className="link-button"
                  disabled={isLoading}
                >
                  Faça login
                </button>
              </p>
            ) : (
              <p>
                Não tem uma conta?{' '}
                <button 
                  type="button" 
                  onClick={toggleMode} 
                  className="link-button"
                  disabled={isLoading}
                >
                  Cadastre-se
                </button>
              </p>
            )}
          </div>
        </div>

        <div className="login-decoration">
          <p className="decoration-text">
            Descubra e catalogue os melhores livros da literatura brasileira
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
