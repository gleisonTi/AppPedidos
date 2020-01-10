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
import CheckBox from "react-native-check-box"; // cleckbox que funciona nos 2
import { connect } from "react-redux";
import { TextInputMask } from "react-native-masked-text";
import { showMessage, hideMessage } from "react-native-flash-message";

var imgfundo = require("../res/img/fundo_estrelas_branco.png");

class CadDadosCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JChecked: false,
      FChecked: true,
      tipo: "Fisico",
      nome: "",
      sobrenome: "",
      cpfOrcnpj: "",
      telefone: "",
      email: this.props.navigation.state.params.email,
      senha: this.props.navigation.state.params.senha
    };
  }
  validaCpfCnpj = () => {
    return this.state.FChecked ? 14 : 18;
  };
  proximo = () => {
    if (
      this.state.nome !== "" &&
      this.state.sobrenome !== "" &&
      this.state.telefone !== "" &&
      this.state.cpfOrcnpj !== ""
    ) {
      if (this.state.cpfOrcnpj.length === this.validaCpfCnpj()) {
        console.log(this.state.telefone.length + " => ");
        if (this.state.telefone.length >= 14) {
          this.props.saveDados({
            tipo: this.state.tipo,
            nome: this.state.nome,
            sobrenome: this.state.sobrenome,
            cpfOrcnpj: this.state.cpfOrcnpj,
            telefone: this.state.telefone,
            email: this.state.email,
            senha: this.state.senha
          });

          this.props.navigation.navigate("CadEnderecoCliente");
        }else{
          showMessage({
            message: "Erro ao cadastrar",
            description:"Telefone Digitado não e Valido",
            type: "warning",
            icon: "auto"
          });
        }
      } else {
        showMessage({
          message: "Erro ao cadastrar",
          description: this.state.FChecked
            ? "CPF digitado não e valido "
            : "CNPJ digitado não e valido ",
          type: "warning",
          duration:5000,
          icon: "auto"
        });
      }
    } else {
      showMessage({
        message: "Erro ao cadastrar",
        description: "Preencha todos os campos",
        type: "warning",
        icon: "auto",
        duration:5000,

      });
    }
  };

  render() {
    console.log(this.state);
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
              <Text style={styles.title}> Tipo de Cliente </Text>
              <Text style={styles.txt}> Qual o tipo de Cliente?</Text>
              <View style={styles.blockButtons1}>
                <CheckBox
                  style={stylesComponent.checkBox}
                  onClick={() => {
                    this.setState({
                      FChecked: !this.state.FChecked,
                      JChecked: this.state.FChecked,
                      tipo: "Fisico",
                      nome: "",
                      sobrenome: "",
                      cpfOrcnpj: "",
                      telefone: ""
                    });
                  }}
                  isChecked={this.state.FChecked}
                  rightText={"Fisico"}
                  checkBoxColor={"#0093dd"}
                />
                <CheckBox
                  style={stylesComponent.checkBox}
                  onClick={() => {
                    this.setState({
                      JChecked: !this.state.JChecked,
                      FChecked: this.state.JChecked,
                      tipo: "Juridico",
                      nome: "",
                      sobrenome: "",
                      cpfOrcnpj: "",
                      telefone: ""
                    });
                  }}
                  isChecked={this.state.JChecked}
                  rightText={"Juridico"}
                  checkBoxColor={"#0093dd"}
                />
              </View>
            </View>
            <View style={styles.block}>
              <Text style={styles.title}>
                {this.state.FChecked
                  ? "Cadastro do Cliente"
                  : "Cadastro da Empresa"}
              </Text>
              <Text style={styles.txt}>
                {this.state.FChecked
                  ? "Precisamos coletar alguns dados sobre você"
                  : "Precisamos coletar alguns dados sobre a empresa"}
              </Text>
              <TextInput
                style={stylesComponent.textImputs}
                placeholder={
                  this.state.FChecked ? " Digite seu Nome" : "Nome da Empresa"
                }
                placeholderTextColor="#808080"
                onChangeText={text => {
                  this.setState({ nome: text });
                }}
                defaultValue={this.state.nome}
              />
              <TextInput
                style={stylesComponent.textImputs}
                placeholder={
                  this.state.FChecked ? " Digite seu Sobrenome" : "Razão Social"
                }
                placeholderTextColor="#808080"
                onChangeText={text => {
                  this.setState({ sobrenome: text });
                }}
                defaultValue={this.state.sobrenome}
              />
              <TextInputMask
                style={stylesComponent.textImputs}
                placeholder={
                  this.state.FChecked ? " Digite seu Cpf" : " Digite o Cnpj"
                }
                placeholderTextColor="#808080"
                keyboardType="numeric"
                onChangeText={text => {
                  this.setState({ cpfOrcnpj: text });
                }}
                value={this.state.cpfOrcnpj}
                type={this.state.FChecked ? "cpf" : "cnpj"}
              />
              <TextInputMask
                style={stylesComponent.textImputs}
                placeholder=" Telefone"
                placeholderTextColor="#808080"
                keyboardType="phone-pad"
                onChangeText={text => {
                  this.setState({ telefone: text });
                }}
                value={this.state.telefone}
                type={"cel-phone"}
              />
              <View style={styles.blockButtons}>
                <TouchableOpacity
                  style={styles.buttons2}
                  onPress={() => {
                    this.proximo();
                    console.log(this.state);
                  }}
                >
                  <Text style={styles.txtButton}>Criar Conta</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  data: state.criarContaDadosReducer
});

const mapDispatchToProps = dispatch => ({
  saveDados: text => dispatch({ type: "ADD_CLIENTE", payload: text })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CadDadosCliente);

const stylesComponent = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center"
  },
  textImputs: {
    marginTop: 8,
    width: "60%",
    height: 40,
    backgroundColor: "#DCDCDC",
    borderRadius: 50,
    textAlign: "center"
  },
  checkBox: {
    width: 100,
    alignItems: "center"
  }
});
