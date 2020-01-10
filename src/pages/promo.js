import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image
} from "react-native";
import api from "../services/api";
import { Card, Title, Paragraph } from "react-native-paper";

export default class Promo extends Component {
  static navigationOptions = {
    tabBarLabel: "Promoções"
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
    const response = await api.get("/rest/listadepromocao", {
      headers: { Authorization: token }
    });
    const docs = response.data;

    this.setState({ docs });
  };

  renderItem = ({ item }) => (
    <Card style={{marginBottom:10}}>
      <Card.Cover source={{ uri: "http://www.estrelafriosapp.com.br/"+item.PromocaoImage }} />
      <Card.Content>
        <Title></Title>
        <Paragraph>{item.PromocaoDescricao}</Paragraph>
      </Card.Content>
    </Card>
  );
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.docs}
          keyExtractor={item => item.ProdutoCodigo}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    flex: 1
  },
  list: {
    padding: 15
  },
  promo: {
   marginBottom:20
  },
  boxMeio: {
    flex: 1,
    flexDirection: "row"
  },
  itemNome: {
    width: "50%",
    fontWeight: "bold",
    flexWrap: "wrap"
  },
  itemGrupo: {
    fontSize: 12
  },
  itemUnidade: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "bold",
    color: "#0093dd"
  },
  itemPreco: {
    fontWeight: "bold",
    marginLeft: 14,
    fontSize: 16
  }
});
