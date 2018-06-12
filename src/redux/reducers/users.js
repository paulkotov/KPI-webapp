const defaultState = {
  dataLoading: true,
  data: []
};

export default function users (state = defaultState, action) {
  switch (action.type) {
    case 'GET_USERS_DATA':
      return state;
  
    case 'ADD_USERS_DATA':
      return { ...state, data: action.payload  };
  
    default:
      return state;
  }
}

export let data = defaultState.data;