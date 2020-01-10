import { AsyncStorage } from "react-native";

const initialState = {
  pedidoItens: null,
  totalPedido: 0,
  cliente: null,
  tipoPag: "",
  endfinal: null,
  msg: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "DADOS_FINAL":
      return { ...state, cliente: action.payload };
    case "SALVA_PAGAMENTO":
      return { ...state, tipoPag: action.payload };
    case "ENDERECO_FINAL":
      return { ...state, endfinal: action.payload };
    case "TOTAL_FINAL":
      return { ...state, totalPedido: action.payload };
    case "SALVA_PEDIDOS":
      return { ...state, pedidoItens: action.payload };
    case "ADD_NEW_ADDRES":
      state.cliente.endereco = action.payload
      console.log(state.cliente.endereco)
      console.log(action.payload)
      return { ...state,  };
    case "RESPOSTA_DO_SERVIDOR":
      return { ...state, msg: action.payload };
    case "LIMPA_FINAL":
      return {
        ...state,
        pedidoItens: null,
        totalPedido: 0,
        cliente: null,
        tipoPag: "",
        endfinal: null,
        msg: null
      };

    default:
      return state;
  }
};
