const defaultState = {
  user: null,
};

export default function auth (state=defaultState, action){
  switch (action.type){
    case 'LOGIN':
      return { ...state, user: action.payload ? action.payload : defaultState.user };
    case 'LOGOUT':
      return { ...state, user: null };
    
    case 'GET_CURRENT_USER':
      return state;
    
    default:
      return state;
  }
}