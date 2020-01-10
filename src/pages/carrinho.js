import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
  FlatList
} from "react-native";

import { TextMask } from "react-native-masked-text";

import { onSignIn } from "../auth";
import api from "../services/api"; // deve se buscar a lista de produtos no carrinho
import { Card } from "react-native-paper";
import Icons from "react-native-vector-icons/Ionicons";
import { styles } from "../styles";
import CheckBox from "react-native-check-box"; // cleckbox que funciona nos 2
import { connect } from "react-redux";
import ItemCartComponent from "../components/ItemCartCompont";
class Carrinho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnRemove: true,
      RChecked: false,
      qunatidadeItens: 0,
      cartVasio: true
    };
  }

  renderItem = ({ item }) => <ItemCartComponent item={item} />;

  testaCarrinho = () =>{
    if (this.props.cartItens.pedidoItems.length > 0) {
      return true;
    }
    return false;
  }

  render() {
        return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Card style={stylesComponent.card} elevation={3}>
            <View style={stylesComponent.cabList}>
              <View style={stylesComponent.cabItem2}>
                <Text style={stylesComponent.title}>Quantidade</Text>
                <Text style={stylesComponent.quantidade}>
                  {parseInt(this.props.cartItens.cont)} Produtos
                </Text>
              </View>
              <View style={stylesComponent.cabItem2}>
                <Text style={stylesComponent.title}>Total</Text>
                <TextMask
                  style={stylesComponent.total}
                  value={this.props.cartItens.valorTotal}
                  type={"money"}
                />
              </View>
            </View>
          </Card>
          <Card style={{ padding: 4, margin: 8 }} elevation={3}>
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
            {this.testaCarrinho() ? (
              <View>
                <FlatList
                  contentContainerStyle={stylesComponent.list}
                  data={this.props.cartItens.pedidoItems}
                  keyExtractor={item => item.ProdutoCodigo}
                  renderItem={this.renderItem}
                  extraData={this.state}
                /> 
              </View>
            ) : (
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
                  Carrinho Vazio
                </Text>
              </View>
            )}
          </Card>
        </View>
        <TouchableOpacity
          style={stylesComponent.btnRemover}
          onPress={() => {
            if (this.props.cartItens.removeItem) {
              this.props.deleteItemCArt(); //show 
            } else {
              this.props.deleteCArt();
              //this.setState({RChecked:false})
            }
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#FFF",
              marginRight: 5
            }}
          >
            Remover Item
          </Text>
          <Icons
            name={Platform.OS === "ios" ? "ios-trash" : "md-trash"}
            size={20}
            padding={2}
            style={{ color: "#ffff", margin: 2 }}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItens: state.carrinhoReducer
  };
};

const mapDispatchToProps = dispatch => ({
  addItemToCart: product =>
    dispatch({ type: "ADD_INTERN_CART", payload: product }),
  removeItemCArt: product =>
    dispatch({ type: "REMOVE_INTERN_CART", payload: product }),
  deleteItemCArt: () => dispatch({ type: "REMOVE_FROM_CART", payload: false }),
  deleteCArt: () => dispatch({ type: "DELETE_INTERN_CART", payload: true }),
  dismarkRemove: () => dispatch({ type: "DISMARK_ITENS", payload: {} })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carrinho);

const stylesComponent = StyleSheet.create({
  itemProduto: {
    backgroundColor: "#fff",
    borderColor: "#DDD",

    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginBottom: 8
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
    height: 330
  },
  cabList: {
    flexDirection: "row"
  },
  checkBox: {
    width: 100,
    alignItems: "center"
  },
  cabItem: {
    width: "30%",
    marginLeft: 8,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  cabItem2: {
    width: "50%",
    marginLeft: 8,
    padding: 8
  },
  title: {
    fontWeight: "bold",
    fontSize: 18
  },
  quantidade: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#0731ab"
  },
  total: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#0093dd"
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
  btnRemover: {
    margin: 8,
    flexDirection: "row",
    backgroundColor: "#0093dd",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 50,
    marginRight: 8
  }
});
