

const initialState = {
    listaProdutos: [],
    fullistaProdutos: [],
    search:false
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'SALVA_LISTA_PRODUTOS':
      return { ...state, fullistaProdutos: action.payload, listaProdutos: action.payload};
      case 'DISABLE_SEARCH':
      return { ...state, search: false };
      case 'PESQUISA_LISTA_PRODUTOS':
        console.log(action.payload)
        console.log(state.fullistaProdutos)
      return { ...state, listaProdutos: action.payload, search:true};
      default:
      return state
    }
  };