import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
  FlatList
} from "react-native";

import { TextMask ,TextInputMask} from "react-native-masked-text";
//import TextInputMask from "react-native-text-input-mask";

import { onSignIn } from "../auth";
import api from "../services/api"; // deve se buscar a lista de produtos no carrinho
import { Card } from "react-native-paper";
import Icons from "react-native-vector-icons/Ionicons";
import { styles } from "../styles";
import CheckBox from "react-native-check-box"; // cleckbox que funciona nos 2
import { connect } from "react-redux";
import { mascara } from "../personMask";

class ItemCartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docs: [],
      quantidade: this.props.item.quantidade,
      RChecked: false
    };
  }

  testaFracionado = (unidade)=>{
    if(unidade === "KG"){
      return true
    }else{
      return false
    }
  }


  render() {
    //this.setState({quantidade:this.props.item.quantidade}
    return (
      <Card style={stylesComponent.itemProduto}>
        <View style={styles.itemGrupo}>
          <Text>{this.props.item.produto.ProdutoGrupo}</Text>
        </View>
        <View style={styles.boxMeio}>
          <View style={styles.info}>
            <Text style={stylesComponent.itemNome}>
              {this.props.item.produto.ProdutoNome}
            </Text>
            {this.props.cartItens.removeItem ? (
              <View style={styles.boxMeio}>
                <TouchableOpacity
                  style={styles.btnConprar}
                  onPress={() => this.props.removeItemCArt(this.props.item)}
                >
                  <Icons
                    name={
                      Platform.OS === "ios"
                        ? "ios-remove-circle"
                        : "md-remove-circle"
                    }
                    style={{ color: "#ff8000", marginLeft: 6 }}
                    size={20}
                  />
                </TouchableOpacity>
                <TextInput
                  type={'none'}
                  style={{
                    height: 40,
                    width: 50,
                    textAlign: "center",                                                                                                                                
                    fontSize: 16
                  }}
                  editable={this.testaFracionado(this.props.item.produto.ProdutoUnidade)}
                  maxLength={5}
                  onChangeText={text => {
                    this.props.alteraValor(this.props.item, text);
                    this.props.atualizatTotal();
                  }} //  edit
                  defaultValue={this.props.item.quantidade.toFixed(1)}
                  keyboardType="decimal-pad"
                />
                <TouchableOpacity
                  style={styles.btnConprar}
                  onPress={() => this.props.addItemToCart(this.props.item)}
                >
                  <Icons
                    name={
                      Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"
                    }
                    style={{ color: "#ff8000", marginLeft: 6 }}
                    size={20}
                  />
                </TouchableOpacity>
                <Text style={{ marginLeft: 8, fontWeight: "bold" }}>
                  {this.props.item.produto.ProdutoUnidade}
                </Text>
              </View>
            ) : (
              <View>
                <CheckBox
                  style={stylesComponent.checkBox}
                  onClick={() => {
                    if (!this.state.RChecked) {
                      this.props.addDeleteItemCArt(this.props.item); //  add a lista de remoção
                    } else {
                      this.props.removeDeleteItemCArt(this.props.item); //  remove da lista de remoção
                    }
                    this.setState({ RChecked: !this.state.RChecked});
                  }}
                  isChecked={this.state.RChecked}
                  rightText={"Remover"}
                  checkBoxColor={"#0093dd"}
                />
              </View>
            )}
          </View>
          <View style={stylesComponent.btnAdd}>
            <TextMask
              style={stylesComponent.itemPreco}
              value={this.props.item.totalproduto}
              type={"money"}
            />
          </View>
        </View>
        {this.testaFracionado(this.props.item.produto.ProdutoUnidade) && (
          <Text style={stylesComponent.itemFracionado}>
            Este produto pode sofrer alteração na pesagem
          </Text>
        )}
      </Card>
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
  addDeleteItemCArt: product =>
    dispatch({ type: "ADD_DELETE_INTERN_CART", payload: product }),
  removeDeleteItemCArt: product =>
    dispatch({ type: "REMOVE_DELETE_INTERN_CART", payload: product }),
  alteraValor: (produto, quantidade) =>
    dispatch({ type: "ALTERA_QUANTIDADE", payload: { quantidade, produto } }),
  atualizatTotal: () => dispatch({ type: "ATUALIZA_TOTAL", payload: {} })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemCartComponent);

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
  itemFracionado: {
    fontSize: 12,
    marginLeft: "20%",
    backgroundColor: "#fce0e1",
    color: "#ff7171",
    padding: 5,
    borderRadius: 5,
    alignItems: "center"
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
  },
  itemNome: {
    width: "50%",
    fontWeight: "bold",
    flexWrap: "wrap"
  }
});
