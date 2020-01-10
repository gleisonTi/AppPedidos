import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
import  Main  from "./pages/main";
import Login from "./pages/login";
import CriarConta from "./pages/criarConta";
import VerificaEmail from "./pages/verificaEmail";
import CadDadosCliente from "./pages/cadDadosCliente";
import CadEnderecoCliente from "./pages/cadEnderecoCliente";
import RecuperaSenha from "./pages/recuperarSenha";
import ConfirmaDadosCliente from "./pages/confirmaDadosCliente";
import EscolhaEndereco from "./pages/escolhaEndereco";
import FinalizaCompra from "./pages/finalizaCompra";
import MenuDrawer from "./pages/menuDrawer";
import Carrinho from "./pages/carrinho";
import PedidoSucess from "./pages/pedidoSucess";
import ListaPedidos from "./pages/listaPedidos";
import SobreEmpresa from "./pages/sobreEmpresa";
import PedidoDados from "./pages/pedidoDados";
import PoliticaDeVendas from "./pages/politicaDeVendas";
import FinalizaBtnComponet from "./components/FinalizaBtnComponent"
import ContatoEmpresa from "./pages/contatoEmpresa";
import CartConponent from "./components/cartConponent";
import SearchConponent from "./components/searchComponent";
import Icons from "react-native-vector-icons/Ionicons";
import Promo from "./pages/promo"
import SearchBar from 'react-native-searchbar'; //campo de pesquisa
import React, { Component } from "react";
import { Platform, TouchableOpacity, View, Text } from "react-native";

const tabBarConfiguration = {
  // configuração das abas
  tabBarOptions: {
    activeTintColor: "white",
    inactiveTintColor: "lightgray",
    activeTintColor: "#FFFF",
    labelStyle: {
      fontSize: 12,
      fontWeight: "bold"
    },
    style: {
      backgroundColor: "#0093dd",
      borderTopColor: "white"
    }
  }
};

const Tabs = createMaterialTopTabNavigator(
  {
    Main: {
      screen: Main
    },
    Promo: {
      screen: Promo
    }
  },
  tabBarConfiguration
);

export const Principal = createStackNavigator(
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => ({
        title: "Estrela Frios",
        headerStyle: {
          backgroundColor: "#0093dd",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0
        },
        headerTintColor: "#fff",
        header: (<SearchConponent navigation={navigation}/>
        ),
      })
    },
    Carrinho: {
      screen: Carrinho,
      navigationOptions: ({ navigation }) => ({
        title: "Seu carrinho",
        headerStyle: {
          backgroundColor: "#0093dd",
          elevation: 3
        },
        headerTintColor: "#fff",
        headerRight: (
          <FinalizaBtnComponet nav={navigation}/>
          
        )
      })
    },
    EscolhaEndereco: {
      screen: EscolhaEndereco,
      navigationOptions: ({ navigation }) => ({
        title: "Endereço",
        headerStyle: {
          backgroundColor: "#0093dd",
          elevation: 3
        },
        headerTintColor: "#fff",
        headerRight: (
          <FinalizaBtnComponet nav={navigation} continuar={true} />
        )
      })
    },
    FinalizaCompra: {
      screen: FinalizaCompra,
      navigationOptions: ({ navigation }) => ({
        title: "Finalizar Compra",
        headerStyle: {
          backgroundColor: "#0093dd",
          elevation: 3
        },
        headerTintColor: "#fff"
      })
    },
    PedidoSucess: {
      screen: PedidoSucess,
      navigationOptions: ({ navigation }) => ({
        title: "Pedido",
        headerStyle: {
          backgroundColor: "#0093dd",
          elevation: 3
        },
        headerTintColor: "#fff",
        headerLeft: null
      })
    },
    ListaPedidos: {
      screen: ListaPedidos,
      navigationOptions: ({ navigation }) => ({
        title: "Pedidos",
        headerStyle: {
          backgroundColor: "#0093dd",
          elevation: 3
        },
        headerTintColor: "#fff"
      })
    },
    PedidoDados: {
      screen: PedidoDados,
      navigationOptions: ({ navigation }) => ({
        title: "Dados do Pedido",
        headerStyle: {
          backgroundColor: "#0093dd",
          elevation: 3
        },
        headerTintColor: "#fff"
      })
    },
    SobreEmpresa: {
      screen: SobreEmpresa,
      navigationOptions: ({ navigation }) => ({
        title: "Sobre a Empresa",
        headerStyle: {
          backgroundColor: "#0093dd",
          elevation: 3
        },
        headerTintColor: "#fff"
      })
    },
    PoliticaDeVendas: {
      screen: PoliticaDeVendas,
      navigationOptions: ({ navigation }) => ({
        title: "Politica de vendas",
        headerStyle: {
          backgroundColor: "#0093dd",
          elevation: 3
        },
        headerTintColor: "#fff"
      })
    },
    ContatoEmpresa: {
      screen: ContatoEmpresa,
      navigationOptions: ({ navigation }) => ({
        title: "Contatos",
        headerStyle: {
          backgroundColor: "#0093dd",
          elevation: 3
        },
        headerTintColor: "#fff"
      })
    }
  },
  {
    initialRouteName: "Tabs"
  }
);
const MainDrawer = createDrawerNavigator(
  {
    Principal: {
      screen: Principal
    }
  },
  {
    contentComponent: MenuDrawer
  }
);

export const Inicio = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },

    CriarConta: {
      screen: CriarConta,
      navigationOptions: {
        title: "Criar Conta",
        headerStyle: {
          backgroundColor: "#0093dd"
        },
        headerTintColor: "#fff"
      }
    },
    RecuperaSenha: {
      screen: RecuperaSenha,
      navigationOptions: {
        title: "Recuperar Senha",
        headerStyle: {
          backgroundColor: "#0093dd"
        },
        headerTintColor: "#fff"
      }
    },
    CadDadosCliente: {
      screen: CadDadosCliente,
      navigationOptions: {
        title: "Dados do Cliente",
        headerStyle: {
          backgroundColor: "#0093dd"
        },
        headerTintColor: "#fff"
      }
    },
    VerificaEmail: {
      screen: VerificaEmail,
      navigationOptions: {
        title: "Confirmar email",
        headerStyle: {
          backgroundColor: "#0093dd"
        },
        headerTintColor: "#fff"
      }
    },
    CadEnderecoCliente: {
      screen: CadEnderecoCliente,
      navigationOptions: {
        title: "Cadastrar Endereço",
        headerStyle: {
          backgroundColor: "#0093dd"
        },
        headerTintColor: "#fff"
      }
    },
    ConfirmaDadosCliente: {
      screen: ConfirmaDadosCliente,
      navigationOptions: {
        title: "Confirmar Dados",
        headerStyle: {
          backgroundColor: "#0093dd"
        },
        headerTintColor: "#fff"
      }
    }
  },
  {
    initialRouteName: "Login"
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      Inicio: {
        screen: Inicio
      },
      MainDrawer: {
        screen: MainDrawer
      }
    },
    {
      initialRouteName: signedIn ? "MainDrawer" : "Inicio"
    }
  );
};
