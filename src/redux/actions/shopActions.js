import { shopActionTypes } from '../reducers/shopReducer';

export const setProducts = (products) => ({
  type: shopActionTypes.SET_PRODUCTS,
  payload: products
});

export const setCategories = (categories) => ({
  type: shopActionTypes.SET_CATEGORIES,
  payload: categories
});

export const setOrders = (orders) => ({
  type: shopActionTypes.SET_ORDERS,
  payload: orders
});

export const setSelectedCategory = (categoryId) => ({
  type: shopActionTypes.SET_SELECTED_CATEGORY,
  payload: categoryId
});

export const setSelectedProduct = (product) => ({
  type: shopActionTypes.SET_SELECTED_PRODUCT,
  payload: product
});
