import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrder } from '../api/ordersApi';
import { getProductById } from '../api/productsApi';
import { setSelectedProduct } from '../redux/actions/shopActions';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const product = useSelector((state) => state.shop.selectedProduct);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(productId);
        dispatch(setSelectedProduct(data));
      } catch (error) {
        toast.error('Could not load product.');
      }
    };

    loadProduct();

    return () => {
      dispatch(setSelectedProduct(null));
    };
  }, [dispatch, productId]);

  const handleBuy = async () => {
    if (!user || !product) {
      toast.error('Log in to place an order.');
      return;
    }

    try {
      await createOrder({
        userId: user.id,
        items: [product],
        date: new Date().toLocaleString(),
        total: Number(product.price)
      });
      toast.success('Order created successfully.');
    } catch (error) {
      toast.error('Could not create order.');
    }
  };

  if (!product) {
    return (
      <div className="page-shell page-shell-narrow">
        <div className="empty-box">
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="product-page">
        <div className="product-page-media">
          <img src={product.img} alt={product.name} className="product-page-image" />
        </div>

        <div className="product-page-content">
          <span className="product-page-tag">{product.categoryName}</span>
          <h1>{product.name}</h1>
          <p className="product-page-price">{Number(product.price).toLocaleString()} KZT</p>
          {product.description ? (
            <p className="product-page-description">{product.description}</p>
          ) : null}

          <div className="product-page-actions">
            <button type="button" className="button button-inline" onClick={handleBuy}>
              Buy now
            </button>
            <Link to="/" className="button button-secondary button-inline">
              Back to catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
