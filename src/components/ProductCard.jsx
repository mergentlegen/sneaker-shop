import React from 'react';

const ProductCard = ({ product, canBuy, onBuy }) => {
  return (
    <article className="card">
      <img src={product.img} alt={product.name} className="card-image" />
      <h3>{product.name}</h3>
      <p>{Number(product.price).toLocaleString()} KZT</p>

      {canBuy ? (
        <button type="button" className="button" onClick={() => onBuy(product)}>
          Купить сейчас
        </button>
      ) : (
        <p className="card-hint">Войдите, чтобы оформить покупку.</p>
      )}
    </article>
  );
};

export default ProductCard;
