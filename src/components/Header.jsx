import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutUser } from '../redux/actions/authActions';

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.info('You have logged out.');
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
            Catalog
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="nav-link">
                My Orders
              </Link>

              {user.role === 'admin' && (
                <Link to="/admin" className="nav-link nav-link-admin">
                  Admin
                </Link>
              )}

              <div className="user-box">
                <span className="user-badge">
                  {user.username} | {user.role}
                </span>
                <button type="button" className="button button-danger button-inline" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="button button-inline">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
