import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  Image
} from "react-native";

import { TextMask } from "react-native-masked-text";
import {
  createMaterialTopTabNavigator,
  createDrawerNavigator
} from "react-navigation";
import api from "../services/api";
import { onSignOut } from "../auth";
import Promo from "../pages/promo.js";
import { Card } from "react-native-paper";
import ActionButton from "react-native-action-button";
import Icons from "react-native-vector-icons/Ionicons";
import { styles } from "../styles";
import { connect } from "react-redux";
import { carregaProdutosApi } from "../actions";
import SearchBar from 'react-native-searchbar'; //campo de pesquisa


class Main extends Component {
  static navigationOptions = {
    tabBarLabel: "Protutos"
  };

  state = {
    docs: [],
    resToken: "",
    reqBody:"client_id=0427fb886275490194b06dd5176e1d61&granttype=password&scope=FullControl&username=admin&password=admin123"
  };


  componentDidMount() {
    this.buscaToken()
  }

  buscaToken = async () => {
    //const response = await api.get("/listadeprodutos");
    api
      .post(
        "/oauth/access_token", // pega o tokem do usuario admin para visualizar os dados
        this.state.reqBody,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      .then(r => {
        this.setState({ resToken: r.data.access_token });
        this.caregaProdutos(this.state.resToken);
      }) // recupera token do admin
      .catch(e => console.log(e));

    // criar função dentro da requisição para chamar outra requisição para busca dos produtos e listalos na tela
  };

  caregaProdutos = async token => {
    const response = await api.get("/rest/listadeprodutos", {
      headers: { Authorization: token }
    });
    const docs = response.data;

    this.setState({ docs });
    this.props.addListProdutos(docs)
  };

  renderItem = ({ item }) => (
    <Card style={styles.itemProduto}>
      <Text style={styles.itemGrupo}>{item.ProdutoGrupo}</Text>
      <View style={styles.boxMeio}>
        <View style={styles.info}>
          <Text style={styles.itemNome}>{item.ProdutoNome}</Text>
          <Text style={styles.itemUnidade}>{item.ProdutoUnidade}</Text>
          <TextMask
                  style={styles.itemPreco}
                  value={item.ProdutoPreco}
                  type={"money"}
                />
        </View>
        <View style={styles.btnAdd}>
          <TouchableOpacity
            style={styles.btnConprar}
            onPress={() => {
              this.props.addItemToCart(item); 
            }}
          >
            <Icons
              name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
              style={{ color: "#0093dd", marginLeft: 6 }}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );



  render() {
    // const {loading,error,produtos } = this.props.produtosData

    // if(loading){
    //   return(
    //   <View>
    //     <Text>CArregando Produtos</Text>
    //   </View>
    //   )
    // }

    // if(error){
    //   return(
    //   <View>
    //     <Text>{error}</Text>
    //   </View>
    //   )
    // }
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={this.props.data.search ? this.props.data.listaProdutos : this.props.data.fullistaProdutos} // mudança para props
          keyExtractor={item => item.ProdutoCodigo}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
 const mapStateToProps = state => ({
     produtosData: state.produtosReducer,
     data: state.listaProdutosReducer
  });

const mapDispatchToProps = dispatch => ({
  addListProdutos: product => dispatch({ type: "SALVA_LISTA_PRODUTOS", payload: product }),
  ListProdutos: product => dispatch({ type: "PESQUISA_LISTA_PRODUTOS", payload: product }),
  addItemToCart: product => dispatch({ type: "ADD_TO_CART", payload: product })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

