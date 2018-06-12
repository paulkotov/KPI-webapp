export const addData = data => ({ type: 'ADD_USERS_DATA', payload: data });
export const delData = () => ({ type: 'DEL_USERS_DATA' });
export const editData = (id, data) => ({ type: 'EDIT_USERS_DATA', payload: { id, data } });
