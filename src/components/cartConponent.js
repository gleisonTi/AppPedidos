import React, { Component } from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";
import Icons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

class CartConponent extends Component {
  testaCarrinho = () => {
    if (this.props.cartItens.pedidoItems.length > 0) {
      return true;
    }
    return false;
  };

  render() {
    const cont = this.props.cartItens;
    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: "#FFF", fontWeight: "bold" }}>{cont.cont}</Text>
        <TouchableOpacity
          style={{ padding: 8, marginRight: 8 }}
          onPress={() => {
            this.props.nav.navigate("Carrinho");
          }}
        >
          <Icons
            name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
            size={30}
            style={{ color: "#ffff", margin: 2 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItens: state.carrinhoReducer
  };
};

export default connect(mapStateToProps)(CartConponent);
