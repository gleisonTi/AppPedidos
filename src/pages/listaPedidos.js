import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Image
} from "react-native";
import {
  createMaterialTopTabNavigator,
  createDrawerNavigator
} from "react-navigation";
import api from "../services/api";
import { getUser } from "../auth";
import Promo from "../pages/promo.js";
import { Card } from "react-native-paper";
import ActionButton from "react-native-action-button";
import { TextMask } from "react-native-masked-text";
import Icons from "react-native-vector-icons/Ionicons";
import { styles } from "../styles";
import { connect } from "react-redux";
class ListaPedidos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      pedidos: [],
      loading: false
    };
  }

  static navigationOptions = {
    tabBarLabel: "Protutos"
  };

  componentDidMount() {
    this.setState({ loading: true });
    getUser("token").then(res => {
      this.setState({ token: res });
    });

    getUser("userData").then(res => {
      const user = JSON.parse(res);
      this.setState({ user: user });
      //this.setState({userData:data});
      this.getListaPedidos(user);
    });
  }

  getListaPedidos = user => {
    api
      .post(
        "/rest/ListaPedidosCliente", // pega o tokem do usuario admin para visualizar os dados
        { usuarioGuid: user.id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.state.token
          }
        }
      )
      .then(r => {
        // resposta do desconto true/ false
        console.log(r.data);
        this.props.salvaListaPedidos(r.data.PedidosListSDT.reverse());
        this.setState({ loading: false });
      }) // recupera token do admin
      .catch(e => console.log(e));
  };

  carregarProdutos = async () => {
    const response = await api.get("/listadeprodutos");
    const docs = response.data;

    this.setState({ docs });
    console.log(docs);
  };

  alteredColorStatus = status => {
    if (status.trim() === "Cancelado") {
      return stylesComponent.itemStatusCancell;
    } else if (status.trim() === "Faturado") {
      return stylesComponent.itemStatusFaturado;
    } else {
      return stylesComponent.itemStatus;
    }
  };

  isListClear = () => {
    if (this.props.pedidos.listaPedidos.length < 1) {
      // se a lista esta vazia mostra outro componente
      return true;
    } else {
      return false;
    }
  };

  renderItem = ({ item }) => (
    <Card style={styles.itemProduto}>
      <View style={stylesComponent.boxMeio}>
        <View style={stylesComponent.info}>
          <Text style={{ width: "10%", flex: 1 }}>Pedido: </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16, flex: 1 }}>
            {parseInt(item.id)}
          </Text>
          <Text style={this.alteredColorStatus(item.status)}>
            {item.status}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "65%" }}>
          <Text
            style={{
              marginTop: 3,
              color: "#005984",
              fontWeight: "bold",
              fontSize: 14
            }}
          >
            {item.pedidoItems.length} itens
          </Text>
          <Text style={styles.itemNome}>{item.dataPedido}</Text>
        </View>
        <View style={stylesComponent.btnDetalhes}>
          <View style={{ flexDirection: "row", marginTop: 2 }}>
            <Text>Total: </Text>
            <TextMask
              style={stylesComponent.total}
              value={parseFloat(item.valorTotal).toFixed(2)}
              type={"money"}
            />
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              this.props.navigation.navigate("PedidoDados", item);
            }}
          >
            <Text style={styles.itemUnidade}>Ver detalhes</Text>
            <Icons
              name={
                Platform.OS === "ios"
                  ? "ios-arrow-dropright"
                  : "md-arrow-dropright"
              }
              style={{ color: "#0093dd", marginLeft: 6 }}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
  render() {
    console.log(this.props);
    const pedidos = this.props.pedidos.listaPedidos;
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color= "#0093dd" />
          </View>
        ) : (
          <View style={styles.container}>
            {this.isListClear() ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icons
                  name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
                  size={100}
                  padding={2}
                  style={{ color: "#DDD" }}
                />
                <Text
                  style={{ color: "#DDD", fontSize: 40, fontWeight: "bold" }}
                >
                  Não há Pedidos
                </Text>
              </View>
            ) : (
              <FlatList
                contentContainerStyle={styles.list}
                data={pedidos}
                keyExtractor={item => item.ProdutoCodigo}
                renderItem={this.renderItem}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  pedidos: state.listaPedidosReducer
});

const mapDispatchToProps = dispatch => ({
  salvaListaPedidos: pedidoList =>
    dispatch({ type: "SALVA_LISTA_PEDIDOS", payload: pedidoList })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListaPedidos);

const stylesComponent = StyleSheet.create({
  info: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  boxMeio: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    borderBottomColor: "#DDD",
    borderBottomWidth: 2
  },
  itemStatus: {
    fontSize: 16,
    marginLeft: 130,
    flex: 2,
    width: "60%",
    fontWeight: "bold",
    color: "#0093dd",
    fontStyle: "italic"
  },
  itemStatusCancell: {
    fontSize: 16,
    marginLeft: 130,
    flex: 2,
    width: "60%",
    fontWeight: "bold",
    color: "#ff7171",
    fontStyle: "italic"
  },
  itemStatusFaturado: {
    fontSize: 16,
    marginLeft: 130,
    flex: 2,
    width: "60%",
    fontWeight: "bold",
    color: "#00ae00",
    fontStyle: "italic"
  },
  btnDetalhes: {
    width: "30%"
  },
  total: {
    fontWeight: "bold",
    color: "#ffba00"
  }
});
