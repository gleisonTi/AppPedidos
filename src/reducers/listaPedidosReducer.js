import {AsyncStorage} from 'react-native';


const initialState = {
    listaPedidos: [],
    loading:false
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'SALVA_LISTA_PEDIDOS':
      return { ...state, listaPedidos: action.payload, loading:true};
    
      default:
      return state
    }
  };