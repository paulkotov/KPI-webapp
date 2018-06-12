export const login = profile => ({ type: 'LOGIN', payload: profile });
export const getCurrentUser = () => ({ type: 'GET_CURRENT_USER' });
export const logout = () => ({ type: 'LOGOUT' });