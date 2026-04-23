const savedUser = localStorage.getItem('user');

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null
};

export const authActionTypes = {
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout'
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload
      };
    case authActionTypes.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
