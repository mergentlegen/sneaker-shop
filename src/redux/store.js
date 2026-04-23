import { combineReducers, createStore } from 'redux';
import { authReducer } from './reducers/authReducer';
import { shopReducer } from './reducers/shopReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  shop: shopReducer
});

export const store = createStore(rootReducer);

store.subscribe(() => {
  const { user } = store.getState().auth;

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
});
