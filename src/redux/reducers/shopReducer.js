const initialState = {
  products: [],
  categories: [],
  orders: [],
  selectedCategoryId: 'all',
  selectedProduct: null
};

export const shopActionTypes = {
  SET_PRODUCTS: 'shop/setProducts',
  SET_CATEGORIES: 'shop/setCategories',
  SET_ORDERS: 'shop/setOrders',
  SET_SELECTED_CATEGORY: 'shop/setSelectedCategory',
  SET_SELECTED_PRODUCT: 'shop/setSelectedProduct'
};

export function shopReducer(state = initialState, action) {
  switch (action.type) {
    case shopActionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case shopActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case shopActionTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case shopActionTypes.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategoryId: action.payload
      };
    case shopActionTypes.SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload
      };
    default:
      return state;
  }
}
