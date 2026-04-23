import { authActionTypes } from '../reducers/authReducer';

export const setUser = (user) => ({
  type: authActionTypes.LOGIN,
  payload: user
});

export const logoutUser = () => ({
  type: authActionTypes.LOGOUT
});
