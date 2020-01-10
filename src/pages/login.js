import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import api from "../services/api";
import { onSignIn, USER_KEY, changeKey } from "../auth";
import { styles } from "../styles";
import { connect } from "react-redux";
import { ProgressDialog } from "react-native-simple-dialogs";
import { showMessage, hideMessage } from "react-native-flash-message";

var imgfundo = require("../res/img/fundo_colage.png");
var imglogo = require("../res/img/logo3.png");
class Login extends Component {
  buscaToken = async (email, senha) => {
    //const response = await api.get("/listadeprodutos")
    this.props.loading(); // inicia progress dialog

    api
      .post(
        "/oauth/access_token", // pega o tokem do usuario admin para visualizar os dados
        "client_id=0427fb886275490194b06dd5176e1d61&granttype=password&scope=FullControl&username=" +
          email +
          "&password=" +
          senha,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      .then(r => {
        console.log(r.data);
        this.props.salvaToken({
          token: r.data.access_token,
          usuarioGuid: r.data.user_guid
        });
        this.buscaUsuario({ usuarioGuid: r.data.user_guid });
        console.log(this.props.data.loading);
      })
      .catch(e => {
        console.log(e.response.data.error.message);
        this.props.loading(); // inicia progress dialog

        showMessage({
          message: "Erro ao Logar",
          description:e.response.data.error.message,
          type: "warning",
          backgroundColor:  "#0093dd", 
          duration:5000,

        });
      });

    // criar função dentro da requisição para chamar outra requisição para busca dos produtos e listalos na tela
  };

  buscaUsuario = async usuarioGuid => {
    //const response = await api.get("/listadeprodutos");
    console.log(JSON.stringify(usuarioGuid));
    const body = JSON.stringify(usuarioGuid);
    api
      .post(
        "/rest/usuario",
        body, // guid de busca do usuario
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.props.data.token
          }
        }
      )
      .then(r => {
        console.log(r.data.ClienteSDT);
        this.props.salvaDados(r.data.ClienteSDT)
        this.props.loading(); // inicia progress dialog
        this.props.validaLogin(true)
                    console.log(USER_KEY)
                    onSignIn().then(() =>
                      this.props.navigation.navigate("Main")
                    );
      })
      .catch(e => {
        console.log(e);
      });

    // criar função dentro da requisição para chamar outra requisição para busca dos produtos e listalos na tela
  };

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
            <ProgressDialog
              visible={this.props.data.loading}
              title="Buscando Usuário"
              message="Por favor, aguarde..."
            />
            <View style={styles.block}>
              <Image source={imglogo} style={styles.logo} />
              <TextInput
                style={stylesComponent.textImputs}
                placeholder="Email"
                placeholderTextColor="#A9A9A9"
                keyboardType="email-address"
                onChangeText={text => {
                  this.props.alteraEmail(text);
                }} //  edit
                defaultValue={this.props.data.email}
              />
              <TextInput
                style={stylesComponent.textImputs}
                placeholder="Senha"
                secureTextEntry={true}
                placeholderTextColor="#A9A9A9"
                onChangeText={text => {
                  this.props.alteraSenha(text);
                }} //  edit
                defaultValue={this.props.data.senha}
              />

              <View style={styles.blockButtons}>
                <TouchableOpacity
                  style={styles.buttons1}
                  onPress={() => { 
                  this.props.navigation.navigate("Main")
                  }}
                >
                  <Text style={styles.txtButton}>Ver Produtos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttons2}
                  onPress={() => {
                    this.buscaToken(
                      this.props.data.email,
                      this.props.data.senha
                    );
                  }}
                >
                  <Text style={styles.txtButton}>Entrar</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.blockText}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("RecuperaSenha");
                  }}
                >
                  <Text style={styles.Rsenha}>Recuperar Senha</Text>
                </TouchableOpacity>
                <Text>|</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("CriarConta");
                  }}
                >
                  <Text style={styles.Cconta}>Criar Conta</Text>
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
  data: state.loginReducer
});

const mapDispatchToProps = dispatch => ({
  //  no conceito redux convencional as actions são separadas do arquivo por questões de aprendizado resolvi colocalas dentro do mapDispachprops
  alteraEmail: email => dispatch({ type: "ALTERA_EMAIL", payload: email }), // action
  alteraSenha: senha => dispatch({ type: "ALTERA_SENHA", payload: senha }),
  salvaToken: token => dispatch({ type: "SALVA_TOKEM", payload: token }),
  salvaDados: userDados => dispatch({ type: "SALVA_DADOS", payload: userDados }),
  validaLogin: logar => dispatch({ type: "LOGAR", payload:logar }),
  loading: () => dispatch({ type: "LOADING", payload: {} })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

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
