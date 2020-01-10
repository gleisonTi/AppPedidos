import {AsyncStorage} from 'react-native';


const initialState = {
    loading: false,
    validLogin:false,
    error: null,
    usuarioGuid:'',
    token:'',
    email:'',
    senha:'',
    userData:null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'ALTERA_EMAIL':
      return { ...state, email: action.payload};

      case 'ALTERA_SENHA':
      return { ...state,senha: action.payload};

      case 'LOADING':
      return { ...state,loading: !state.loading};
      
      case 'SALVA_TOKEM': // armazena token do usuario 
      AsyncStorage.setItem('token',action.payload.token)
      return { ...state, usuarioGuid: action.payload.usuarioGuid ,token:action.payload.token};

      case 'SALVA_DADOS': // armazena dados do usuario
      AsyncStorage.setItem('userData',JSON.stringify(action.payload))
      return { ...state, userData:action.payload};

      default:
      return state
    }
  };