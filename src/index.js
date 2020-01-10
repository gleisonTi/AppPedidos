import React from "react";
import { Routes } from "./routes";
import "./config/StatusBarConfig";
import { createRootNavigator } from "./routes";
import { isSignedIn } from "./auth";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import FlashMessage from "react-native-flash-message";
// reducers
import produtosReducer from "./reducers/produtosReducer";
import carrinhoReducer from "./reducers/carrinhoReducer";
import loginReducer from "./reducers/loginReducer";
import enderecoReducer from "./reducers/enderecoReducer";
import finalizaReducer from "./reducers/finalizaReducer";
import listaPedidosReducer from "./reducers/listaPedidosReducer";
import criarContaDadosReducer from "./reducers/criarContaDadosReducer";
import listaProdutosReducer from "./reducers/listaProdutosReducer";

// combina todos os reducers
const rootReducer = combineReducers({
  produtosReducer,
  listaPedidosReducer,
  criarContaDadosReducer,
  carrinhoReducer,
  loginReducer,
  enderecoReducer,
  finalizaReducer,
  listaProdutosReducer
});
// cria store Redux de acesso aos estados
const store = createStore(rootReducer, applyMiddleware(thunk));
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // estado inicial da aplicação
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    // verifica se esta ou não logado
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true })) // retorna treu ou false para o estado
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // Se ainda não verificamos o AsyncStorage, não renderizemos nada (melhores maneiras de fazer isso
    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);

    return (
      <Provider store={store}>
        <Layout />
        <FlashMessage position="top" />
      </Provider>
    );
  }
}
