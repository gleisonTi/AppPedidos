import {AsyncStorage} from 'react-native';

const initialState = {
    loading: false,
    newEnd:null,
    cliente:null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_CLIENTE':
      return { ...state, cliente :action.payload};
      case 'ADD_ENDERECO_CLIENTE':
      return { ...state, newEnd :action.payload};
      default:
      return state
    }
  };