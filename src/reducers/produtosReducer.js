import {
  CARREGA_PRODUTOS,
  CARREGA_PRODUTOS_FAIL,
  CARREGA_PRODUTOS_SUCESS,
  ADD_PRODUTOS,
  CARREGA_TOKEN
} from "../constantes";

const initialState = {
  loading: false,
  error: null,
  produtos: [],
  token:''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CARREGA_PRODUTOS:
      return { ...state, loading: true };
    case CARREGA_PRODUTOS_FAIL:
      return { ...state, loading: false, error: action.error };
    case CARREGA_PRODUTOS_SUCESS:
      return { ...state, loading: false, produtos: action.data};
    case ADD_PRODUTOS:
      return { ...state };
    case CARREGA_TOKEN:
      return { ...state, token: action.token };
    default:
    return state
  }
};
