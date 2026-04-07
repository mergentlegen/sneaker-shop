import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const ProfilePage = () => {
  const { user, orders, fetchOrders, deleteOrder } = useContext(AppContext);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="page-shell page-shell-narrow">
      <header className="page-header">
        <h1>Личный кабинет</h1>
        <p>
          Добро пожаловать, <strong>{user.username}</strong>!
        </p>
        <span className="meta-text">ID пользователя: {user.id}</span>
      </header>

      <section>
        <h3>История ваших заказов</h3>

        {orders.length === 0 ? (
          <div className="empty-box">
            <p>У вас пока нет оформленных заказов.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-item">
                <div>
                  <h4>Заказ №{order.id}</h4>
                  <p className="order-meta">Дата: {order.date}</p>
                  <p className="order-total">Итого: {order.total} KZT</p>
                </div>

                <div className="order-actions">
                  <button
                    type="button"
                    className="button button-danger button-inline"
                    onClick={() => {
                      if (window.confirm('Вы уверены, что хотите отменить этот заказ?')) {
                        deleteOrder(order.id);
                      }
                    }}
                  >
                    Отменить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
