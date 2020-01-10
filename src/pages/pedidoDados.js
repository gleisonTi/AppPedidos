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
  Picker
} from "react-native";
import api from "../services/api";
import { onSignIn, getUser } from "../auth";
import { styles } from "../styles";
import Icons from "react-native-vector-icons/Ionicons";
import { Card } from "react-native-paper";
import CadEnderecoCliente from "./cadEnderecoCliente";
import { TextMask } from "react-native-masked-text";
import { ProgressDialog, ConfirmDialog, } from "react-native-simple-dialogs";
import { bold } from "ansi-colors";
import {connect} from "react-redux";

var imgfundo = require("../res/img/fundo_estrelas_branco.png");
 class PedidoDados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docs: null,
      loading: false,
      showDialog: false,
      tokem: "",
      user:null,
      status:'',
      observacao:''
    };
  }

  componentDidMount() {
    this.setState({status: this.props.navigation.state.params.status})
    this.setState({observacao: this.props.navigation.state.params.observacao})

    getUser("token").then(res => {
      this.setState({ token: res });
    });
  }
  cancelaPedido = (id ,cliente)=> {
    api
      .post(
        "/rest/cancelaPedido", // pega o tokem do usuario admin para visualizar os dados
        { PedidoCod: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.state.token
          }
        }
      )
      .then(r => {
        // resposta do desconto true/ false
        this.getListaPedidos()
        console.log(r.data);
      }) // recupera token do admin
      .catch(e => {
        console.log(e), this.setState({ loading: false });
      });


      api
      .post(
        "/rest/ListaPedidosCliente", // pega o tokem do usuario admin para visualizar os dados
        {usuarioGuid:cliente.id},
        {
          headers: { "Content-Type": "application/json", Authorization:this.state.token }
        }
      )
      .then(r => {
        // resposta do desconto true/ false
        console.log(r.data)
        this.props.salvaListaPedidos(r.data.PedidosListSDT.reverse())
        this.setState({status:"Cancelado"})
        this.setState({observacao:"Pedido cancelado pelo Usuário"})
        this.setState({ loading: false });

      }) // recupera token do admin
      .catch(e => console.log(e));
  };

 

  isCanceled = () => {
    if (this.state.status.trim() === "Cancelado" || this.state.status.trim() === "Faturado") {
      return true;
    } else {
      return false;
    }
  };

  alteredColorStatus = () => {
    if (this.state.status.trim() === "Cancelado") {
      console.log(stylesComponent.statusCancel);
      return stylesComponent.statusCancel;
    } else if (this.state.status.trim() === "Faturado") {
      console.log(stylesComponent.statusFaturado);
      return stylesComponent.statusFaturado;
    } else {
      return stylesComponent.status;
    }
  };
  
  alteredColorObservacao = () => {
    if (this.state.status.trim() === "Cancelado") {
      console.log(stylesComponent.statusCancel);
      return stylesComponent.txtCanceled;
    } else if (this.state.status.trim() === "Faturado") {
      console.log(stylesComponent.statusFaturado);
      return stylesComponent.txtFaturado;
    }
  };

  renderItem = ({ item }) => (
    <Card style={stylesComponent.itemProduto}>
      <Text style={styles.itemGrupo}>{item.produto.ProdutoGrupo}</Text>
      <View style={styles.boxMeio}>
        <View style={styles.info}>
          <Text style={styles.itemNome}>{item.produto.ProdutoNome}</Text>
          <Text style={styles.itemPreco}>
            {parseFloat(item.quantidade).toFixed(2)}
          </Text>
          <Text style={styles.itemUnidade}>{item.produto.ProdutoUnidade}</Text>
        </View>
        <View style={stylesComponent.btnAdd}>
          <TextMask
            style={stylesComponent.itemPreco}
            value={parseFloat(item.totalproduto).toFixed(2)}
            type={"money"}
          />
        </View>
      </View>
    </Card>
  );

  render() {
    const {
      qtdItens,
      status,
      valorTotal,
      pedidoItems,
      id,
      observacao,
      cliente
    } = this.props.navigation.state.params;
  
    function CardView(props) {
      const { cliente, tipoPagamento } = props.nav.state.params;
      console.log(props.nav.state.params);
      console.log(cliente);
      return (
        <Card style={{ margin: 10, padding: 8 }} elevation={3}>
          <View>
            <View style={stylesComponent.block}>
              <Text style={stylesComponent.nome}>
                {cliente.primeiroNome.trim()}
              </Text>
              <Text>{cliente.segundoNome.trim()}</Text>
              <Text>{cliente.cpf.trim() || cliente.cnpj.trim()}</Text>
            </View>
            <View style={stylesComponent.blockLine}>
              <View style={stylesComponent.box1}>
                <Text style={stylesComponent.label}>Endereço: </Text>
                <Text>{cliente.endereco.endereco.trim()}</Text>
              </View>
              <View style={stylesComponent.box2}>
                <Text style={stylesComponent.label}>Nº: </Text>
                <Text>{cliente.endereco.numero.trim()}</Text>
              </View>
            </View>
            <View style={stylesComponent.blockLine}>
              <View style={stylesComponent.box1}>
                <Text style={stylesComponent.label}>Bairro: </Text>
                <Text>{cliente.endereco.bairro.trim()}</Text>
              </View>
              <View style={stylesComponent.box2}>
                <Text style={stylesComponent.label}>Cep: </Text>
                <Text>{cliente.endereco.cep.trim()}</Text>
              </View>
            </View>
            <View style={stylesComponent.blockLine}>
              <View style={stylesComponent.box1}>
                <Text style={stylesComponent.label}>Cidade: </Text>
                <Text>{cliente.endereco.cidade.trim()}</Text>
              </View>
              <View style={stylesComponent.box2}>
                <Text style={stylesComponent.label}>Uf: </Text>
                <Text>{cliente.endereco.uf.trim()}</Text>
              </View>
            </View>
            <View style={stylesComponent.blockLine}>
              <View style={stylesComponent.box1}>
                <Text style={stylesComponent.label}>Telefone: </Text>
                <Text>{cliente.telefone.trim()}</Text>
              </View>
              <View style={stylesComponent.box2}>
                <Text style={stylesComponent.label}>Complemento: </Text>
                <Text>{cliente.endereco.complemento.trim()}</Text>
              </View>
            </View>
            <View style={stylesComponent.blockLine}>
              <View style={stylesComponent.box1}>
                <Text style={stylesComponent.label}>Email: </Text>
                <Text>{cliente.email}</Text>
              </View>
              <View style={stylesComponent.box2}>
                <Text style={stylesComponent.label}>Pagamento: </Text>
                <Text>{tipoPagamento}</Text>
              </View>
            </View>
          </View>
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
            <ConfirmDialog
              title="Cancelar Pedido"
              message="Deseja cancelar o pedido ?"
              visible={this.state.showDialog}
              onTouchOutside={() => this.setState({ showDialog: false })}
              positiveButton={{
                title: "Sim",
                onPress: () => {
                  this.cancelaPedido(id,cliente);
                  this.setState({ loading: true, showDialog: false });
                }
              }}
              negativeButton={{
                title: "Não",
                onPress: () => {
                  this.setState({ showDialog: false });
                }
              }}
            />

            <ProgressDialog
              visible={this.state.loading}
              title="Cancelando Pedido"
              message="Por favor, aguarde..."
            />
            <View style={styles.block}>
              <Text style={stylesComponent.txt}>Informações</Text>
              <Text style={{fontSize:12,}}>Pedido:</Text>
              <Text style={{fontSize:22,fontWeight:'bold',marginTop:4}}>{ parseInt(id)}</Text>
            </View>

            <Card style={stylesComponent.card} elevation={3}>
              <View style={stylesComponent.cabList}>
                <View style={stylesComponent.cabItem2}>
                  <Text style={stylesComponent.title}>Quantidade:</Text>
                  <Text style={stylesComponent.quantidade}>
                    {parseInt(qtdItens)} Produtos
                  </Text>
                </View>
                <View style={stylesComponent.cabItem2}>
                  <Text style={stylesComponent.title}>Total:</Text>
                  <TextMask
                    style={stylesComponent.total}
                    value={parseInt(valorTotal).toFixed(2)}
                    type={"money"}
                  />
                </View>
                <View style={stylesComponent.cabItem2}>
                  <Text style={stylesComponent.title}>Status:</Text>
                  <Text style={this.alteredColorStatus()}>{this.state.status.trim()}</Text>
                </View>
              </View>
            </Card>
            {this.isCanceled() && (
              <Text style={this.alteredColorObservacao()}>{this.state.observacao.trim()}</Text>
            )}

            <CardView nav={this.props.navigation} />
            <View style={styles.block}>
              <Text style={stylesComponent.txt}>Produtos</Text>
            </View>
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
                  <Text>Quantidade</Text>
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
                  data={pedidoItems}
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
              {this.isCanceled() ? (
                <Text style={this.alteredColorObservacao()}>
                  Seu pedido foi {this.state.status.trim()}. para mais imformações entre em contato no menu lateral
                </Text>
              ) : (
                <TouchableOpacity
                  style={stylesComponent.btnFinalizar}
                  onPress={() => {
                    this.setState({ showDialog: true });
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#FFF",
                      marginRight: 5
                    }}
                  >
                    Cancelar Pedido
                  </Text>
                  <Icons
                    name={Platform.OS === "ios" ? "ios-trash" : "md-trash"}
                    size={30}
                    padding={2}
                    style={{ color: "#ffff", margin: 2 }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </ScrollView>
    );
  }
}


const mapStateToProps = state => ({
  pedidos: state.listaPedidosReducer,
});
const mapDispatchToProps = dispatch => ({
  salvaListaPedidos: pedidoList => dispatch({ type: "SALVA_LISTA_PEDIDOS", payload: pedidoList }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PedidoDados);

const stylesComponent = StyleSheet.create({
  txtCanceled: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fce0e1",
    color: "#ff7171",
    padding: 5,
    textAlign: "center",
    fontWeight: "bold",
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center"
  },
  txtFaturado: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f2fff2",
    color: "#00ae00",
    padding: 5,
    textAlign: "center",
    fontWeight: "bold",
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center"
  },
  txt: {
    fontSize: 22,
    color: "#00557d",
    paddingVertical: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  list: {
    padding: 4
  },
  card: {
    margin: 8,
    width: "95%",
    height: 70
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
  title: {
    fontWeight: "bold",
    fontSize: 14
  },
  quantidade: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#0731ab"
  },
  total: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#0093dd"
  },
  status: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#ffba00"
  },
  statusCancel: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#ff7171"
  },
  statusFaturado: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#00ae00"
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
    width: "33%",
    alignItems: "center",
    marginTop: 8,
    padding: 4
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
    backgroundColor: "#ff4040",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 50,
    marginRight: 8
  }
});
