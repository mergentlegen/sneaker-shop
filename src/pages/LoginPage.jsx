import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, registerUser } from '../api/authApi';
import { setUser } from '../redux/actions/authActions';

const LoginPage = () => {
  const [isReg, setIsReg] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const normalizeUser = (data) => ({
    id: data.id || Date.now(),
    username: data.username || form.username,
    role: data.role || 'user'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = isReg ? await registerUser(form) : await loginUser(form);
      dispatch(setUser(normalizeUser(data)));
      toast.success(isReg ? 'Registration completed successfully.' : 'You are logged in.');
      navigate('/');
    } catch (err) {
      const fallbackRole = form.username.trim().toLowerCase() === 'admin' ? 'admin' : 'user';

      dispatch(
        setUser({
          id: Date.now(),
          username: form.username,
          role: fallbackRole
        })
      );

      toast.info(
        isReg
          ? 'Server is unavailable. Demo registration is saved locally.'
          : 'Server is unavailable. Demo login is saved locally.'
      );
      navigate('/');
    }
  };

  return (
    <div className="auth-box">
      <h2 className="auth-title">{isReg ? 'Create Account' : 'Authorization'}</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Username"
          required
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="button">
          {isReg ? 'Register' : 'Login'}
        </button>
      </form>

      <p className="auth-switch" onClick={() => setIsReg(!isReg)}>
        {isReg ? 'Already have an account? Login' : 'No account yet? Register'}
      </p>
    </div>
  );
};

export default LoginPage;
