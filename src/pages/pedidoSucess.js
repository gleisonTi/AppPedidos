import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  BackHandler
} from "react-native";
import api from "../services/api";
import { onSignIn } from "../auth";
import { styles } from "../styles";
import Icons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { TextMask } from "react-native-masked-text";
import { StackActions, NavigationActions } from 'react-navigation';


const resetAction = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  actions: [
    NavigationActions.navigate({ routeName: 'Tabs' }),
  ],
});
class PedidoSucess extends Component {

  constructor(props){
    super(props)

    this.state = {
      quantidade: this.props.dataProd.pedidoItems.length,
      totalCompra: this.props.dataProd.valorTotal,
      codigoCompra: this.props.datafinal.msg.pedidoCod,
    }

    this._onBackClicked = this._onBackClicked.bind(this);

  }

  componentDidMount(){
    this.props.limpaCarrinho()
    this.props.limpaEndereco()
    this.props.limpaFinal()

    BackHandler.addEventListener('backPress',this._onBackClicked)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('backPress',this._onBackClicked)
  }

  _onBackClicked = () => {
    console.log("back")
    this.props.navigation.dispatch(resetAction)
    return true;
  } 

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "#FFF" }}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView style={styles.imageBackground} behavior="padding">
          <View style={styles.block}>
            <Icons
              name={
                Platform.OS === "ios"
                  ? "ios-checkmark-circle"
                  : "md-checkmark-circle"
              }
              size={90}
              style={{ color: "#31af91", paddingTop: 2 }}
            />
            <Text style={stylesComponent.txtSucess}>
              PEDIDO REALIZADO COM SUCESSO!
            </Text>
            <Text style={{}}>PEDIDO:</Text>
            <Text
              style={{ fontSize: 50, fontWeight: "bold", marginBottom: 10 }}
            >
              {("00000" + this.state.codigoCompra).slice(-5)}
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 2 }}>
                Quantidade:
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#005984",
                  marginLeft: 4
                }}
              >
                {this.state.quantidade + ' itens'}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginLeft: 30,
                  marginTop: 2
                }}
              >
                Total:{" "}
              </Text>
              <TextMask
                style={stylesComponent.itemPreco}
                value={this.state.totalCompra}
                type={"money"}
              />
            </View>

            <Text style={stylesComponent.txtSucess}>
              SEU PEDIDO SERÁ ANALISADO PARA CONFIRMAÇÃO.
            </Text>

            <Text style={stylesComponent.txt}>
              VOCÊ PODE ACONPANHAR E VER DETALHES DE SEU PEDIDO CLICANDO EM
              PEDIDOS NO MENU LATERAL.
            </Text>
          </View>

          <View style={styles.blockButtons}>
            <TouchableOpacity
              style={stylesComponent.buttons1}
              onPress={() => {
                onSignIn().then(() =>
                  this.props.navigation.navigate("ListaPedidos")
                );
              }}
            >
              <Icons
                name={Platform.OS === "ios" ? "ios-list-box" : "md-list-box"}
                size={20}
                style={{ color: "#FFF", paddingTop: 2 }}
              />
              <Text style={styles.txtButton}>Pedidos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={stylesComponent.buttons2}
              onPress={() => {
                onSignIn().then(() => this.props.navigation.navigate("Main"));
              }}
            >
              <Icons
                name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
                size={20}
                style={{ color: "#FFF", paddingTop: 2 }}
              />
              <Text style={styles.txtButton}>Voltar aos produtos</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  data: state.enderecoReducer,
  dataProd: state.carrinhoReducer,
  datafinal: state.finalizaReducer
});

const mapDispatchToProps = dispatch => ({
  // limpa dados armazenados
  limpaCarrinho: () => dispatch({ type: "LIMPA_CARRINHO", payload: {} }),
  limpaEndereco: () => dispatch({ type: "LIMPA_ENDERECO", payload: {} }),
  limpaFinal: () => dispatch({ type: "LIMPA_FINAL", payload: {} }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PedidoSucess);

const stylesComponent = StyleSheet.create({
  itemPreco: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#0093dd",
    marginLeft: 4
  },
  textImputs: {
    marginTop: 8,
    width: "90%",
    height: 40,
    backgroundColor: "#FFF",
    paddingLeft: 16,
    borderRadius: 50
  },
  txtSucess: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#31af91",
    marginVertical: 12,
    textAlign: "center"
  },
  txt: {
    padding: 12,
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 12,
    textAlign: "center"
  },
  buttons1: {
    width: "35%",
    height: 40,
    marginLeft: 8,
    marginBottom: 8,
    backgroundColor: "#0093dd",
    paddingHorizontal: 16,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50
  },
  buttons2: {
    width: "59%",
    height: 40,
    marginLeft: 8,
    flexDirection: "row",
    marginBottom: 8,
    backgroundColor: "#ffba00",
    paddingHorizontal: 16,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 50
  }
});
