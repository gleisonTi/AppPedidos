

const initialState = {
  produtos: [],
  listaCarrinho: [],
  tokenUser: ""
};

export default (reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUTOS":
      return { ...state };
    case "GET_LISTA_CARRINHO":
      return { ...state };
    case "ADD_LISTA_CARRINHO":
      state.produtos.push(action.payload);
      return { ...state };
    case "REMOVE_LISTA_CARRINHO":
      return { ...state };
    case "CLEAR_LISTA_CARRINHO":
      return { ...state };
    case "GET_TOKEN":
      return { ...state };

    default:
      return state;
  }
});
