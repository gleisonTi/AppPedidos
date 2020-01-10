import PropTypes from "prop-types";
import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { onSignOut, getUser, deleteUserId } from "../auth";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableHighlight
} from "react-native";
import Icons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

var imglogo = require("../res/img/logo3.png");

class MenuDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData:'none'
    };
  }

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  componentDidMount(){
    getUser('userData').then(res => {
      this.setState({userData:JSON.parse(res)})
    })
  }

  isloguin = () => {
    if (this.state.userData !== 'none') {
      return true;
    } else {
      return false;
    }
  };

  render() {
    //console.log(this.props.data);
    return (
      <View>
        <ScrollView>
          {this.isloguin() && <View>
            <View style={styleDrawer.box}>
              <View style={styleDrawer.box}>
                <Image source={imglogo} style={styleDrawer.img} />
                <Text style={styleDrawer.nome}>
                  {this.state.userData.primeiroNome.trim()}
                </Text>
                <Text style={styleDrawer.email}>
                  {this.state.userData.email}
                </Text>
              </View>
            </View>
            <TouchableHighlight
              style={styleDrawer.boxLine}
              onPress={this.navigateToScreen("ListaPedidos")}
              underlayColor="#DDDD"
            >
              <View style={styleDrawer.row}>
                <Icons
                  name={Platform.OS === "ios" ? "ios-list-box" : "md-list-box"}
                  size={20}
                  style={{ color: "#000", paddingTop: 2 }}
                />
                <Text style={styleDrawer.textLine}>Pedidos</Text>
              </View>
            </TouchableHighlight>
          </View>
          }
          <TouchableHighlight
            style={styleDrawer.boxLine}
            onPress={this.navigateToScreen("Promo")}
            underlayColor="#DDDD"
          >
            <View style={styleDrawer.row}>
              <Icons
                name={Platform.OS === "ios" ? "ios-basket" : "md-basket"}
                size={20}
                style={{ color: "#000", paddingTop: 2 }}
              />
              <Text style={styleDrawer.textLine}>Promoções</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styleDrawer.boxLine}
            onPress={this.navigateToScreen("Carrinho")}
            underlayColor="#DDDD"
          >
            <View style={styleDrawer.row}>
              <Icons
                name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
                size={20}
                style={{ color: "#000", paddingTop: 2 }}
              />
              <Text style={styleDrawer.textLine}>Carrinho</Text>
            </View>
          </TouchableHighlight>
          <View
            style={{
              paddingLeft: 20,
              paddingBottom: 12,
              marginTop: 18,
              borderBottomColor: "#DDD",
              borderBottomWidth: 1
            }}
          >
            <Text style={{ fontSize: 18 }}>Empresa</Text>
          </View>
          <TouchableHighlight
            style={styleDrawer.boxLine}
            onPress={this.navigateToScreen("ContatoEmpresa")}
            underlayColor="#DDDD"
          >
            <View style={styleDrawer.row}>
              <Icons
                name={Platform.OS === "ios" ? "ios-contacts" : "md-contacts"}
                size={20}
                style={{ color: "#000", paddingTop: 2 }}
              />
              <Text style={styleDrawer.textLine}>Contato</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styleDrawer.boxLine}
            onPress={this.navigateToScreen("SobreEmpresa")}
            underlayColor="#DDDD"
          >
            <View style={styleDrawer.row}>
              <Icons
                name={
                  Platform.OS === "ios"
                    ? "ios-information-circle-outline"
                    : "md-information-circle-outline"
                }
                size={20}
                style={{ color: "#000", paddingTop: 2 }}
              />
              <Text style={styleDrawer.textLine}>Sobre</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styleDrawer.boxLine}
            onPress={() => {
              onSignOut().then(() => this.props.navigation.navigate("Login"));
              deleteUserId('userData') // apaga dados do banco interno
              deleteUserId('token') // apaga dados do banco interno
            }}
            underlayColor="#DDDD"
          >
            <View style={styleDrawer.row}>
              <Icons
                name={Platform.OS === "ios" ? "ios-exit" : "md-exit"}
                size={20}
                style={{ color: "#000", paddingTop: 2 }}
              />
              <Text style={styleDrawer.textLine}>Sair</Text>
            </View>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

MenuDrawer.propTypes = {
  navigation: PropTypes.object
};
const mapStateToProps = state => ({
  data: state.loginReducer
});

const mapDispatchToProps = dispatch => ({
  //  no conceito redux convencional as actions são separadas do arquivo por questões de aprendizado resolvi colocalas dentro do mapDispachprops
  limparConta: token => dispatch({ type: "SALVA_TOKEM", payload: token }) // action
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuDrawer);

const styleDrawer = StyleSheet.create({
  box: {
    height: 165,
    flex: 1,
    backgroundColor: "#0093dd",
    alignItems: "center",
    justifyContent: "center"
  },

  img: {
    width: 65,
    height: 65
  },
  nome: {
    marginTop: 20,
    padding: 4,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFF"
  },
  email: {
    padding: 2,
    fontSize: 14,
    color: "#FFFF"
  },
  boxLine: {
    marginTop: 8,
    flex: 1,
    height: 60,
    justifyContent: "center",
    padding: 18
  },
  row: {
    marginLeft: "4%",
    flexDirection: "row"
  },
  textLine: {
    padding: 2,
    fontWeight: "bold",
    marginLeft: "10%",
    fontSize: 16
  }
});
