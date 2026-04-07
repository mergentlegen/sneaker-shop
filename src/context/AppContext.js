import React, { createContext, useCallback, useEffect, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
      setOrders([]);
    }
  }, [user]);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3001/products');
      if (!res.ok) throw new Error('Не удалось загрузить товары');

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Ошибка загрузки товаров:', err);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    if (!user) return;

    try {
      const res = await fetch(`http://localhost:3001/orders?userId=${user.id}`);
      if (!res.ok) throw new Error('Не удалось загрузить заказы');

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Ошибка загрузки заказов:', err);
    }
  }, [user]);

  const createOrder = useCallback(async (items) => {
    if (!user) {
      alert('Войдите в аккаунт, чтобы оформить заказ.');
      return;
    }

    const newOrder = {
      userId: user.id,
      items,
      date: new Date().toLocaleString(),
      total: items.reduce((sum, item) => sum + Number(item.price), 0)
    };

    try {
      const res = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });

      if (!res.ok) throw new Error('Не удалось создать заказ');

      await fetchOrders();
      alert('Заказ оформлен.');
    } catch (err) {
      alert('Не получилось оформить заказ.');
    }
  }, [fetchOrders, user]);

  const deleteOrder = useCallback(async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/orders/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Не удалось удалить заказ');

      setOrders(prev => prev.filter(order => order.id !== id));
    } catch (err) {
      alert('Не получилось удалить заказ.');
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        products,
        setProducts,
        orders,
        fetchOrders,
        createOrder,
        deleteOrder
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
