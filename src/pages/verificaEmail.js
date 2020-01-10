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
import {styles} from "../styles"
import { showMessage } from "react-native-flash-message";


var imgfundo = require("../res/img/fundo_estrelas_branco.png");

export default class VerificaEmail extends Component {
  constructor(props){
    super(props)

    this.state = {
      codConf:"" ,
      codDig:""
      }
  }

componentDidMount(){
  const {codConf} = this.props.navigation.state.params

  this.setState({codConf:codConf })
}

confirmaEmail = ()=>{

  if(this.state.codConf === this.state.codDig){
    this.props.navigation.navigate('CadDadosCliente', this.props.navigation.state.params)

  }else{
    showMessage({
      message: "Erro ao cadastrar",
      description : "Codigo de confirmação não confere" , 
      type: "warning",
      icon: "auto",
      duration:8000,
    });
  }

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
              <Text style={stylesComponent.title}>Um email de confirmação foi enviado para sua caixa de mensagem</Text>
              <Text style={styles.txt}>Digite o código recebido para continuar o cadastro</Text>
              <TextInput
                style={stylesComponent.textImputs}
                placeholder=" Digite aqui"
                placeholderTextColor="#808080"
                onChangeText={(text)=>{
                  this.setState({codDig:text})
                }}
                keyboardType='numeric'
              />
              <View style={styles.blockButtons}>
                <TouchableOpacity style={styles.buttons2} onPress={()=> { this.confirmaEmail() }} >
                  <Text style={styles.txtButton}>Verificar Codigo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const stylesComponent = StyleSheet.create({
    title: {
        fontSize:22,
        fontWeight: "bold",
        color: "gray",
        textAlign:'center'
    },
    textImputs: {
      marginTop: 8,
      width: "40%",
      height: 40,
      backgroundColor:"#DCDCDC",
      borderRadius: 50,
      textAlign:'center'
    },})
