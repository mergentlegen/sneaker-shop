import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <header className="site-header">
      <nav className="nav">
        <Link to="/" className="brand">
          Sneaker Shop
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Каталог
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="nav-link">
                Мои заказы
              </Link>

              {user.role === 'admin' && (
                <Link to="/admin" className="nav-link nav-link-admin">
                  Админка
                </Link>
              )}

              <div className="user-box">
                <span className="user-badge">
                  {user.username} | {user.role}
                </span>
                <button type="button" className="button button-danger button-inline" onClick={handleLogout}>
                  Выйти
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="button button-inline">
              Вход
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
