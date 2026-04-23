import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, canBuy, onBuy }) => {
  return (
    <article className="card">
      <Link to={`/products/${product.id}`} className="card-link">
        <img src={product.img} alt={product.name} className="card-image" />
        <h3>{product.name}</h3>
      </Link>
      <p className="card-category">{product.categoryName}</p>
      <p>{Number(product.price).toLocaleString()} KZT</p>

      {canBuy ? (
        <button type="button" className="button" onClick={() => onBuy(product)}>
          Buy Now
        </button>
      ) : (
        <p className="card-hint">Log in to place an order.</p>
      )}
    </article>
  );
};

export default ProductCard;
