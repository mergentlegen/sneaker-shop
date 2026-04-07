import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const CatalogPage = () => {
  const { products, user, createOrder } = useContext(AppContext);

  return (
    <div className="container">
      <h1 className="page-title">Каталог кроссовок</h1>

      <div className="product-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            canBuy={Boolean(user)}
            onBuy={(currentProduct) => createOrder([currentProduct])}
          />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
