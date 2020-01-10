import {AsyncStorage} from 'react-native';



const initialState = {
    loading: false,
    error: null,
    tipoPag:'Credito',
    newEnd:null,
    userData:null,
    novoEndereco:false
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'SALVA_PAGAMENTO':
      return { ...state, tipoPag:action.payload};
    
      case 'SALVA_DADOS': // armazena dados do usuario
      return { ...state, userData:action.payload, loading:true};

      case 'NOVO_ENDERECO': // armazena dados do usuario
      return { ...state, newEnd:action.payload,novoEndereco:true};
      case 'ENDERECO_PADRAO': // armazena dados do usuario
      return { ...state,novoEndereco:false};

      case 'LIMPA_ENDERECO': // armazena dados do usuario
      return { ...state,
        loading: false,
        error: null,
        tipoPag:'Credito',
        newEnd:null,
        userData:null,
        novoEndereco:false};

      default:
      return state
    }
  };