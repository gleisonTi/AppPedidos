import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  BackHandler ,
  Picker
} from "react-native";
import api from "../services/api";
import { onSignIn, getUser } from "../auth";
import { styles } from "../styles";
import Icons from "react-native-vector-icons/Ionicons";
import { Card } from "react-native-paper";
import { TextMask } from "react-native-masked-text";
import CadEnderecoCliente from "./cadEnderecoCliente";
import { connect } from "react-redux";
import Moment from "moment";
import { StackActions, NavigationActions } from 'react-navigation';


var imgfundo = require("../res/img/fundo_estrelas_branco.png");

const resetAction = StackActions.reset({
  index: 0, // <-- currect active route from actions array
  actions: [
    NavigationActions.navigate({ routeName: 'PedidoSucess' }),
    NavigationActions.navigate({ routeName: 'Tabs' }),
  ],
});
class FinalizaCompra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docs: [],
      btnRemove: true,
      token: "",
      desconto: 0,
      hasDesconto: false
    };
  } 
  componentDidMount() {
    getUser("token").then(res => {
      this.setState({ token: res });
      this.verificaDesconto(res);
    });
    //  SALVA OS DADOS COLETADOS PARA O PEDIDO
    this.props.salvaDadosFinal(this.props.data.userData);
    this.props.savePagFinal(this.props.data.tipoPag);
    this.props.salvaProdutos(this.props.dataProd.pedidoItems);
    
    if (this.props.data.novoEndereco) {
      this.props.finalAddress(this.props.data.newEnd);
      this.props.addNewAddres(this.props.data.newEnd);
    } else {
      this.props.finalAddress(this.props.data.userData.endereco);
    }

    Moment.locale("br");
  }

  finalizarPedido = () => {
    const data = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
    const total = parseFloat(this.props.datafinal.totalPedido.toFixed(3))
    const PedidoSDT = {
      cliente: this.props.datafinal.cliente,
      dataPedido: data,
      id: 1,
      pedidoItems: this.props.datafinal.pedidoItens,
      qtdItens: this.props.datafinal.pedidoItens.length,
      status: "Em aberto",
      tipoPagamento: this.props.datafinal.tipoPag,
      valorTotal:total
    };
    console.log(JSON.stringify( {PedidoSDT}));

    console.log(this.state.token)

    this.enviarPedido(PedidoSDT)
    //this.props.saveResponse({message:'teste',pedidoCod:99,})
    //this.props.navigation.dispatch(resetAction)

  };

  enviarPedido = (PedidoSDT)=>{
    api
      .post(
        "/rest/newpedido", // pega o tokem do usuario admin para visualizar os dados
        {PedidoSDT},
        {
          headers: { "Content-Type": "application/json", Authorization:this.state.token }
        }
      )
      .then(r => {
        // resposta do desconto true/ false
        this.props.saveResponse(r.data.Menssage)
        this.props.navigation.replace('PedidoSucess')        
      }) // recupera token do admin
      .catch(e => console.log(e));
  }

  verificaDesconto = async token => {
    api
      .post(
        "/rest/Pdesconto", // pega o tokem do usuario admin para visualizar os dados
        { usuarioGuid: this.props.data.userData.id },
        {
          headers: { "Content-Type": "application/json", Authorization: token }
        }
      )
      .then(r => {
        // resposta do desconto true/ false
        if (r.data.Menssage.message === "true") {
          this.aplicaDesconto();
        } else {
          this.props.totalFinal(this.props.dataProd.valorTotal);
        }
      }) // recupera token do admin
      .catch(e => console.log(e));
  };

  aplicaDesconto = () => {
    const total = this.props.dataProd.valorTotal;
    const result = total - total * (3 / 100);
    const desc = total - result;
    this.setState({ desconto: desc, hasDesconto: true });
    this.props.totalFinal(result);
  };

  mostraCad = () => {
    this.setState({ boxcad: !this.state.boxcad });
  };

  updatePag = tipoPag => {
    this.setState({ tipoPag: tipoPag });
  };

  renderItem = ({ item }) => (
    <Card style={stylesComponent.itemProduto}>
      <Text style={styles.itemGrupo}>{item.produto.ProdutoGrupo}</Text>
      <View style={styles.boxMeio}>
        <View style={styles.info}>
          <Text style={styles.itemNome}>{item.produto.ProdutoNome}</Text>
          <Text style={styles.itemPreco}>{item.quantidade}</Text>
          <Text style={styles.itemUnidade}>{item.produto.ProdutoUnidade}</Text>
        </View>
        <View style={stylesComponent.btnAdd}>
          <TextMask
            style={stylesComponent.itemPreco}
            value={item.totalproduto}
            type={"money"}
          />
        </View>
      </View>
    </Card>
  );

  render() {
    function CardView(props) {
      return (
        <Card style={{ margin: 10, padding: 8 }} elevation={3}>
          {props.nav.data.loading && (
            <View>
              <View style={stylesComponent.block}>
                <Text style={stylesComponent.nome}>
                  {props.nav.data.userData.primeiroNome.trim()}
                </Text>
                <Text>{props.nav.data.userData.segundoNome.trim()}</Text>
                <Text>
                  {props.nav.data.userData.cpf.trim() ||
                    props.nav.data.userData.cnpj.trim()}
                </Text>
              </View>
              <View style={stylesComponent.blockLine}>
                <View style={stylesComponent.box1}>
                  <Text style={stylesComponent.label}>Endereço: </Text>
                  <Text>
                    {props.nav.data.novoEndereco
                      ? props.nav.data.newEnd.endereco.trim()
                      : props.nav.data.userData.endereco.endereco.trim()}
                  </Text>
                </View>
                <View style={stylesComponent.box2}>
                  <Text style={stylesComponent.label}>Nº: </Text>
                  <Text>
                    {props.nav.data.novoEndereco
                      ? props.nav.data.newEnd.numero.trim()
                      : props.nav.data.userData.endereco.numero.trim()}
                  </Text>
                </View>
              </View>
              <View style={stylesComponent.blockLine}>
                <View style={stylesComponent.box1}>
                  <Text style={stylesComponent.label}>Bairro: </Text>
                  <Text>
                    {props.nav.data.novoEndereco
                      ? props.nav.data.newEnd.bairro.trim()
                      : props.nav.data.userData.endereco.bairro.trim()}
                  </Text>
                </View>
                <View style={stylesComponent.box2}>
                  <Text style={stylesComponent.label}>Cep: </Text>
                  <Text>
                    {props.nav.data.novoEndereco
                      ? props.nav.data.newEnd.cep.trim()
                      : props.nav.data.userData.endereco.cep.trim()}
                  </Text>
                </View>
              </View>
              <View style={stylesComponent.blockLine}>
                <View style={stylesComponent.box1}>
                  <Text style={stylesComponent.label}>Cidade: </Text>
                  <Text>
                    {props.nav.data.novoEndereco
                      ? props.nav.data.newEnd.cidade.trim()
                      : props.nav.data.userData.endereco.cidade.trim()}
                  </Text>
                </View>
                <View style={stylesComponent.box2}>
                  <Text style={stylesComponent.label}>Uf: </Text>
                  <Text>
                    {props.nav.data.novoEndereco
                      ? props.nav.data.newEnd.uf.trim()
                      : props.nav.data.userData.endereco.uf.trim()}
                  </Text>
                </View>
              </View>
              <View style={stylesComponent.blockLine}>
                <View style={stylesComponent.box1}>
                  <Text style={stylesComponent.label}>Telefone: </Text>
                  <Text>{props.nav.data.userData.telefone.trim()}</Text>
                </View>
                <View style={stylesComponent.box2}>
                  <Text style={stylesComponent.label}>Complemento: </Text>
                  <Text>
                    {props.nav.data.novoEndereco
                      ? props.nav.data.newEnd.complemento.trim()
                      : props.nav.data.userData.endereco.complemento.trim()}
                  </Text>
                </View>
              </View>
              <View style={stylesComponent.blockLine}>
                <View style={stylesComponent.box1}>
                  <Text style={stylesComponent.label}>Email: </Text>
                  <Text>{props.nav.data.userData.email}</Text>
                </View>
                <View style={stylesComponent.box2}>
                  <Text style={stylesComponent.label}>Pagamento: </Text>
                  <Text>{props.nav.data.tipoPag}</Text>
                </View>
              </View>
            </View>
          )}
        </Card>
      );
    }
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <ImageBackground
          source={imgfundo}
          style={{ width: "100%", height: "100%" }}
        >
          <KeyboardAvoidingView
            style={styles.imageBackground}
            behavior="padding"
          >
            <View style={styles.block}>
              <Text style={styles.title}>Confirmar Dados</Text>
              <Text style={styles.txt}>
                Para continuar com o pedido confirme as informações abaixo
              </Text>
            </View>
            <CardView nav={this.props} />
            <Card
              style={{
                padding: 4,
                marginHorizontal: 8,
                marginTop: 10,
                marginBottom: 8
              }}
              elevation={3}
            >
              <View style={stylesComponent.cabList}>
                <View style={stylesComponent.cabItem}>
                  <Text>Produto</Text>
                </View>
                <View style={stylesComponent.cabItem}>
                  <Text>Unidade</Text>
                </View>
                <View style={stylesComponent.cabItem}>
                  <Text>Total do Item</Text>
                </View>
              </View>
            </Card>
            <Card style={stylesComponent.cardLista} elevation={3}>
              <View>
                <FlatList
                  contentContainerStyle={stylesComponent.list}
                  data={this.props.dataProd.pedidoItems}
                  keyExtractor={item => item.ProdutoCodigo}
                  renderItem={this.renderItem}
                />
              </View>
            </Card>
            <View
              style={{
                flexDirection: "row",
                margin: 12,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                style={stylesComponent.btnFinalizar}
                onPress={() => {
                  this.finalizarPedido();
                  //this.props.navigation.navigate("PedidoSucess");
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#FFF",
                    marginRight: 5
                  }}
                >
                  Finalizar Pedido
                </Text>
                <Icons
                  name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
                  size={30}
                  padding={2}
                  style={{ color: "#ffff", margin: 2 }}
                />
              </TouchableOpacity>
              <View>
                {this.state.hasDesconto && (
                  <View style={{ flexDirection: "row", margin: 8 }}>
                    <Text
                      style={{
                        marginRight: 8,
                        fontWeight: "bold",
                        fontSize: 14
                      }}
                    >
                      Desconto:
                    </Text>
                    <TextMask
                      style={{
                        marginRight: 8,
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "#0093dd",
                        marginTop: 8
                      }}
                      value={this.state.desconto}
                      type={"money"}
                    />
                  </View>
                )}

                <View style={{ flexDirection: "column", marginLeft: 8 }}>
                  <Text
                    style={{ marginRight: 8, fontWeight: "bold", fontSize: 14 }}
                  >
                    Total Pedido:
                  </Text>
                  <TextMask
                    style={{
                      marginLeft: 60,
                      fontWeight: "bold",
                      fontSize: 28,
                      color: "#0093dd"
                    }}
                    value={this.props.datafinal.totalPedido}
                    type={"money"}
                  />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
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
  //  no conceito redux convencional as actions são separadas do arquivo por questões de aprendizado resolvi colocalas dentro do mapDispachprops
  salvaDadosFinal: userDados =>
    dispatch({ type: "DADOS_FINAL", payload: userDados }),
  savePagFinal: pag => dispatch({ type: "SALVA_PAGAMENTO", payload: pag }),
  saveResponse: msg => dispatch({ type: "RESPOSTA_DO_SERVIDOR", payload: msg }),
  finalAddress: end => dispatch({ type: "ENDERECO_FINAL", payload: end }),
  addNewAddres: end => dispatch({ type: "ADD_NEW_ADDRES", payload: end }),
  totalFinal: desc => dispatch({ type: "TOTAL_FINAL", payload: desc }), // APLICAR DESCONTO NO VALOR FINAL CRIANDO OUTRO REDUCER COM TODOS OS DADOS NECESSARIOS PARA FINALIZAR O PEDIDO
  salvaProdutos: pedidos =>
    dispatch({ type: "SALVA_PEDIDOS", payload: pedidos }) // APLICAR DESCONTO NO VALOR FINAL CRIANDO OUTRO REDUCER COM TODOS OS DADOS NECESSARIOS PARA FINALIZAR O PEDIDO
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinalizaCompra);

const stylesComponent = StyleSheet.create({
  list: {
    padding: 4
  },
  cardLista: {
    marginHorizontal: 8,
    height: 250,
    marginBottom: 8
  },
  block: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  blockLine: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingLeft: 22,
    paddingVertical: 4
  },
  blockLine1: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    margin: 16
  },
  label: {
    fontWeight: "bold"
  },
  box1: {
    width: "60%"
  },
  box2: {
    width: "40%"
  },
  txtButton: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
    marginRight: 4,
    color: "#0093dd"
  },
  nome: {
    fontSize: 28,
    fontWeight: "bold",
    fontStyle: "italic"
  },
  cabList: {
    flexDirection: "row"
  },
  cabItem: {
    width: "30%",
    marginLeft: 8,
    alignItems: "center"
  },
  cabItem2: {
    width: "50%",
    marginLeft: 8,
    padding: 8
  },
  btnAdd: {
    flex: 1,
    width: "40%",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  itemPreco: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#0093dd"
  },
  itemProduto: {
    backgroundColor: "#fff",
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginBottom: 8
  },
  btnFinalizar: {
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "#ffba00",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    borderRadius: 50,
    marginRight: 8
  }
});
