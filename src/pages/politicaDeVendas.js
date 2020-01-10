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
var imglogo = require("../res/img/politica_vendas_img.png");

export default class PoliticaDeVendas extends Component {
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
              <Image source={imglogo} style={styles.capa} />

              <View style={{ marginVertical: 20, flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "#0093dd" }}
                >
                  Politica de{" "}
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "#ffba00" }}
                >
                  Vendas{" "}
                </Text>
              </View>

              <View style={{ paddingHorizontal: 35 }}>
                <Text style={{ marginBottom: 10 }}>
                  NOS PEDIDOS COM VALOR ABAIXO DE R$ 250,00 SERÁ COBRADA UMA
                  TAXA DE ENTREGA.
                </Text>
                <Text>
                  FAÇA O CADASTRO COMPLETO PARA TER PERMISSÃO DE REALIZAR
                  PEDIDOS PELO APLICATIVO
                </Text>
              </View>

              <View style={{ marginVertical: 20, flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "#0093dd" }}
                >
                  Horário de{" "}
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "#ffba00" }}
                >
                  Funcionamento{" "}
                </Text>
              </View>

              <Text style={{ paddingHorizontal: 35 }}>
                SEGUNDA-FEIRA 7:00 ÀS 11:00, 13:00 ÀS 18:00 
                TERÇA-FEIRA 7:00 ÀS 11:00, 13:00 ÀS 18:00 
                QUARTA-FEIRA 7:00 ÀS 11:00, 13:00 ÀS 18:00  
                QUINTA-FEIRA 7:00 ÀS 11:00, 13:00 ÀS 18:00  
                SEXTA-FEIRA 7:00 ÀS 11:00, 13:00 ÀS 18:00 
                SÁBADO 7:00 ÀS 12:30 
                DOMINGO FECHADO
              </Text>

              <View style={{ marginVertical: 20, flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "#0093dd" }}
                >
                  Regiões{" "}
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "#ffba00" }}
                >
                  Atendidas{" "}
                </Text>
              </View>

              <View style={{alignItems:'center',}}>
                <Text style={stylesComponent.title}>TODOS OS DIAS</Text>
                <Text style={{}}>• FRANCA </Text>

                <Text style={stylesComponent.title}>QUARTAS-FEIRAS</Text>
                <Text style={{}}>• ITUVERAVA • JERIQUARA • PEDREGULHO </Text>

                <Text style={stylesComponent.title}>SEXTAS-FEIRAS</Text>
                <Text style={{paddingHorizontal:40, textAlign:'center'}}>• ARAMINA • BURITIZAL • CRISTAIS PAULISTA • IGARAPAVA </Text>
              </View>

              <View style={{ marginVertical: 20 }}>
                <TouchableOpacity
                  style={styles.buttons2}
                  onPress={() => {
                    onSignIn().then(() =>
                      this.props.navigation.navigate("Main")
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
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8
  }
});
