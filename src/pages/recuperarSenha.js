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
import {styles} from "../styles";
import { showMessage } from "react-native-flash-message";



var imgfundo = require("../res/img/fundo_estrelas_branco.png");

export default class RecuperaSenha extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      resToken: "",
      reqBody:"client_id=0427fb886275490194b06dd5176e1d61&granttype=password&scope=FullControl&username=admin&password=admin123"
    };
  }
 
  sendEmailRecover = ()=>{
    if(this.state.email !== ""){
      api.post(
        "/rest/recuperaSenha", // pega o tokem do usuario admin para visualizar os dados
        {UserName:this.state.email},
        {
          headers: { "Content-Type": "application/json", Authorization:this.state.resToken }
        }
      )
      .then(r => {
        console.log(r.data.Menssage)
        if(r.data.Menssage.Id !== ""){
          showMessage({
            message: "Email enviado com Sucesso",
            description: r.data.Menssage.Description,
            type: "success",
            icon: "auto",
            duration:8000,
          });
        }else{
          showMessage({
            message: "Erro ao Enviar",
            description: r.data.Menssage.Description,
            type: "warning",
            icon: "auto",
            duration:8000,
          });
        }
      }) 
      .catch(e => console.log(e));
    }else{
      showMessage({
        message: "Erro ao Enviar",
        description: "E necessario digitar o email para recuperação de senha",
        type: "warning",
        icon: "auto",
        duration:8000,
      });
    }
   
  }

  componentDidMount(){
    api
    .post(
      "/oauth/access_token", // pega o tokem do usuario admin para visualizar os dados
      this.state.reqBody,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    )
    .then(r => {
      this.setState({ resToken: r.data.access_token });
      console.log(r.data.access_token );
    }) // recupera token do admin
    .catch(e => console.log(e));
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps='handled'>
        <ImageBackground
          source={imgfundo}
          style={{ width: "100%", height: "100%" }}
        >
          <KeyboardAvoidingView
            style={styles.imageBackground}
            behavior="padding"
          >
            <View style={styles.block}>
              <Text style={styles.title}>Recuperação de senha</Text>
              <Text style={styles.txt}>Para recuperação de senha de usuario digite seu email abaixo</Text>
              <TextInput
                style={styles.textImputs}
                onChangeText={(text)=>{this.setState({email:text})}}
                placeholder=" Digite seu Email"
                placeholderTextColor="#808080"
                keyboardType='email-address'
              />
              <View style={styles.blockButtons}>
                <TouchableOpacity style={styles.buttons2} onPress={()=>{
                  this.sendEmailRecover()
                }} >
                  <Text style={styles.txtButton}>Enviar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </ScrollView>
    );
  }
}
