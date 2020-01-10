import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import api from "../services/api";
import { onSignIn } from "../auth";
import { styles } from "../styles";

var imgfundo = require("../res/img/fundo_estrelas_branco.png");
var imglogo = require("../res/img/logo3.png");

export default class SobreEmpresa extends Component {
  render() {
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
              <Image source={imglogo} style={styles.logo} />

              <View style={{ marginVertical: 20, flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "#0093dd" }}
                >
                  Sobre a{" "}
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "#ffba00" }}
                >
                  Empresa{" "}
                </Text>
              </View>

              <Text style={{ paddingHorizontal: 40 }}>
                COMERCIO DE FRIOS, ENLATADOS E EMBUTIDOS, NA CIDADE DE FRANCA,
                COM MAIS DE 500 ITENS À DISPOSIÇÃO. VENDAS NO ATACADO E VAREJO.
              </Text>

              <View style={{ marginVertical: 20, flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "#0093dd" }}
                >
                  Observações{" "}
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "#ffba00" }}
                >
                  Adicionais{" "}
                </Text>
              </View>

              <Text>CONHEÇA NOSSA POLITICA DE VENDAS.</Text>

              <View style={{ marginVertical: 20 }}>
                <TouchableOpacity
                  style={styles.buttons1}
                  onPress={() => {
                    onSignIn().then(() =>
                      this.props.navigation.navigate("PoliticaDeVendas")
                    );
                  }}
                >
                  <Text style={styles.txtButton}>Politica de Vendas</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </ScrollView>
    );
  }
}

stylesComponent = StyleSheet.create({
  textImputs: {
    marginTop: 8,
    width: "90%",
    height: 40,
    backgroundColor: "#FFF",
    paddingLeft: 16,
    borderRadius: 50
  }
});
