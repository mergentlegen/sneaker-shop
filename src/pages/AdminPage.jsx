import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AdminPage = () => {
  const { products, setProducts } = useContext(AppContext);
  const [form, setForm] = useState({ name: '', price: '', img: '', category: 'Sneakers' });
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEdit = editId !== null;
    const url = isEdit ? `http://localhost:3001/products/${editId}` : 'http://localhost:3001/products';

    try {
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Ошибка сохранения');

      const data = await res.json();

      if (isEdit) {
        setProducts(products.map(product => (product.id === editId ? data : product)));
      } else {
        setProducts([...products, data]);
      }

      setForm({ name: '', price: '', img: '', category: 'Sneakers' });
      setEditId(null);
      alert('Готово!');
    } catch (err) {
      alert('Ошибка при сохранении.');
    }
  };

  return (
    <div className="container admin-page">
      <h2 className="page-title">Управление товарами</h2>

      <div className="admin-form-box">
        <h3>{editId ? 'Редактировать товар' : 'Добавить новый товар'}</h3>

        <form onSubmit={handleSubmit} className="admin-form">
          <input
            placeholder="Название"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Цена"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            required
          />
          <input
            placeholder="Картинка (URL)"
            value={form.img}
            onChange={(e) => setForm({ ...form, img: e.target.value })}
            required
          />

          <button type="submit" className={`button ${editId ? 'button-success' : ''}`}>
            {editId ? 'Сохранить' : 'Создать'}
          </button>

          {editId && (
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                setEditId(null);
                setForm({ name: '', price: '', img: '', category: 'Sneakers' });
              }}
            >
              Отмена
            </button>
          )}
        </form>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>Товар</th>
            <th>Цена</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price} KZT</td>
              <td>
                <button
                  type="button"
                  className="button button-inline"
                  onClick={() => {
                    setEditId(product.id);
                    setForm(product);
                    window.scrollTo(0, 0);
                  }}
                >
                  Изменить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
