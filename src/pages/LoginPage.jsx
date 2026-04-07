import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const LoginPage = () => {
  const [isReg, setIsReg] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const normalizeUser = (data) => ({
    id: data.id || Date.now(),
    username: data.username || form.username,
    role: data.role || 'user'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const path = isReg ? '/register' : '/login';

    try {
      const res = await fetch(`http://localhost:3001${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setUser(normalizeUser(data));
        alert(isReg ? 'Регистрация прошла успешно.' : 'Вы вошли в аккаунт.');
        navigate('/');
      } else {
        alert(data.error || 'Ошибка входа.');
      }
    } catch (err) {
      const fallbackRole = form.username.trim().toLowerCase() === 'admin' ? 'admin' : 'user';

      setUser({
        id: Date.now(),
        username: form.username,
        role: fallbackRole
      });

      alert('Сервер не запущен, поэтому вход сохранен локально для демонстрации.');
      navigate('/');
    }
  };

  return (
    <div className="auth-box">
      <h2 className="auth-title">{isReg ? 'Создать аккаунт' : 'Авторизация'}</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Логин"
          required
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Пароль"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="button">
          {isReg ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>

      <p className="auth-switch" onClick={() => setIsReg(!isReg)}>
        {isReg ? 'Уже есть профиль? Войти' : 'Нет аккаунта? Регистрация'}
      </p>
    </div>
  );
};

export default LoginPage;
