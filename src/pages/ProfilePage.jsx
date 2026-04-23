import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteOrder, getOrdersByUser } from '../api/ordersApi';
import ConfirmModal from '../components/modals/ConfirmModal';
import { setOrders } from '../redux/actions/shopActions';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.shop.orders);
  const [orderToDelete, setOrderToDelete] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrdersByUser(user.id);
        dispatch(setOrders(data));
      } catch (error) {
        toast.error('Could not load orders.');
      }
    };

    loadOrders();
  }, [dispatch, user.id]);

  const handleDeleteOrder = async () => {
    if (!orderToDelete) {
      return;
    }

    try {
      await deleteOrder(orderToDelete.id);
      dispatch(setOrders(orders.filter((order) => order.id !== orderToDelete.id)));
      toast.success('Order deleted successfully.');
      setOrderToDelete(null);
    } catch (error) {
      toast.error('Could not delete order.');
    }
  };

  return (
    <div className="page-shell page-shell-narrow">
      <header className="page-header">
        <h1>Profile</h1>
        <p>
          Welcome, <strong>{user.username}</strong>!
        </p>
        <span className="meta-text">User ID: {user.id}</span>
      </header>

      <section>
        <h3>Your Order History</h3>

        {orders.length === 0 ? (
          <div className="empty-box">
            <p>You do not have any completed orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-item">
                <div>
                  <h4>Order #{order.id}</h4>
                  <p className="order-meta">Date: {order.date}</p>
                  <p className="order-total">Total: {order.total} KZT</p>
                </div>

                <div className="order-actions">
                  <button
                    type="button"
                    className="button button-danger button-inline"
                    onClick={() => setOrderToDelete(order)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <ConfirmModal
        isOpen={Boolean(orderToDelete)}
        title="Cancel order?"
        description="This order will be permanently removed from your account history."
        confirmText="Delete order"
        cancelText="Keep order"
        onConfirm={handleDeleteOrder}
        onClose={() => setOrderToDelete(null)}
      />
    </div>
  );
};

export default ProfilePage;
