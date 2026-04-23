import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategories } from '../api/categoriesApi';
import { createOrder } from '../api/ordersApi';
import { getProducts } from '../api/productsApi';
import ProductCard from '../components/ProductCard';
import {
  setCategories,
  setProducts,
  setSelectedCategory
} from '../redux/actions/shopActions';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.shop.products);
  const categories = useSelector((state) => state.shop.categories);
  const selectedCategoryId = useSelector((state) => state.shop.selectedCategoryId);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);

        dispatch(setProducts(productsData));
        dispatch(setCategories(categoriesData));
      } catch (error) {
        toast.error('Could not load catalog data.');
      }
    };

    loadData();
  }, [dispatch]);

  const visibleProducts =
    selectedCategoryId === 'all'
      ? products
      : products.filter((product) => product.categoryId === selectedCategoryId);

  const handleBuy = async (product) => {
    if (!user) {
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

  return (
    <div className="container">
      <h1 className="page-title">Sneakers Catalog</h1>

      <div className="filters-row">
        <button
          type="button"
          className={`chip ${selectedCategoryId === 'all' ? 'chip-active' : ''}`}
          onClick={() => dispatch(setSelectedCategory('all'))}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`chip ${selectedCategoryId === category.id ? 'chip-active' : ''}`}
            onClick={() => dispatch(setSelectedCategory(category.id))}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            canBuy={Boolean(user)}
            onBuy={handleBuy}
          />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
