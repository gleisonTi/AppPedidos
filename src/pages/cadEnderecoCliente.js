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
  ScrollView,
  Platform
} from "react-native";
import apiCep from "../services/apicep";
import { onSignIn } from "../auth";
import { styles } from "../styles";
import Icons from "react-native-vector-icons/Ionicons";
import { conrenect } from "react-redux";
import { showMessage, hideMessage } from "react-native-flash-message";
import { connect } from "react-redux";

var imgfundo = require("../res/img/fundo_estrelas_branco.png");

class CadEnderecoCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endereco: "",
      numero: "",
      bairro: "",
      cidade: "",
      complemento: "",
      uf: "",
      cep: ""
    };
  }

  buscaCep = async cep => {
    const response = await apiCep.get(cep + "/json/");
    console.log(response.data.localidade);
    if(response.data.localidade === "Franca" ||
    response.data.localidade === "Ituverava" || 
    response.data.localidade === "Jeriquara" || 
    response.data.localidade === "Pedregulho" || 
    response.data.localidade === "Aramina" || 
    response.data.localidade === "Buritizal" || 
    response.data.localidade === "Cristais Paulista" || 
    response.data.localidade === "Igarapava" 
     ){
      this.setState({
        endereco: response.data.logradouro,
        bairro: response.data.bairro,
        cidade: response.data.localidade,
        uf: response.data.uf,
        complemento: "",
        numero: "",
        cep: response.data.cep
      });
    }else{
      showMessage({
        message: "Endereço indisponivel no momento",
        description : "CIDADE SEM LOGÍSTICA, CONSULTE CONDIÇÕES PELOS TELEFONES (16) 3725-1515 E/OU (16)3725-8947" , 
        type: "warning",
        icon: "auto",
        duration:8000,

      });
    }
    
  };

  finalizaCompra = () => {
    if (
      this.state.endereco !== "" &&
      this.state.numero !== "" &&
      this.state.cidade !== "" &&
      this.state.cep !== "" &&
      this.state.uf !== "" &&
      this.state.bairro !== ""
    ) {
      this.props.newAdress(this.state);
      this.props.navigation.navigate("FinalizaCompra");
    }else{
      showMessage({
        message: "Erro no endereço",
        description : "A campos obrigatorios vazios" , 
        type: "warning",
        icon: "auto",
        duration:5000,

      });
    }
    
  };

  concluirCadastro = () => {
    if (
      this.state.endereco !== "" &&
      this.state.numero !== "" &&
      this.state.cidade !== "" &&
      this.state.cep !== "" &&
      this.state.uf !== "" &&
      this.state.bairro !== ""
    ) {
      this.props.newClienteAdress(this.state);
      this.props.navigation.navigate("ConfirmaDadosCliente");
    }else{
      showMessage({
        message: "Erro no endereço",
        description : "A campos obrigatorios vazios" , 
        type: "warning",
        duration:5000,
        icon: "auto",
      });
    }
   
  };

  render() {
    console.log(this.props);
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
              {!this.props.escolhaEnd && (
                <View>
                  <Text style={styles.title}>Cadastro de Endereço</Text>
                  <Text style={styles.txt}>
                    Precisamos de seu endereço para entrega dos nossos produtos
                  </Text>
                </View>
              )}

              <View style={stylesComponent.box}>
                <TextInput
                  style={stylesComponent.textImputs}
                  placeholder="Cep"
                  maxLength={8}
                  onChangeText={text => {
                    this.setState({ cep: text });
                  }}
                  defaultValue={this.state.cep}
                  placeholderTextColor="#808080"
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={stylesComponent.pesquisar}
                  onPress={() => {
                    this.buscaCep(this.state.cep);
                  }}
                >
                  <Icons
                    name={Platform.OS === "ios" ? "ios-search" : "md-search"}
                    color="#ffba00"
                    size={30}
                  />
                </TouchableOpacity>
              </View>
              <View style={stylesComponent.box}>
                <TextInput
                  style={stylesComponent.textImputs}
                  onChangeText={text => {
                    this.setState({ complemento: text });
                  }} /// parou aqui
                  value={this.state.complemento}
                  placeholder="Complemento"
                  placeholderTextColor="#808080"
                />
                <TextInput
                  style={stylesComponent.textImputsP}
                  placeholder="Nº"
                  placeholderTextColor="#808080"
                  value={this.state.numero}
                  onChangeText={text => {
                    this.setState({ numero: text });
                  }}
                  maxLength={5}
                  keyboardType="numeric"
                />
              </View>

              <View style={stylesComponent.box}>
                <TextInput
                  style={stylesComponent.textImputs}
                  placeholder="Endereço"
                  onChangeText={text => {
                    this.setState({ endereco: text });
                  }}
                  value={this.state.endereco}
                  placeholderTextColor="#808080"
                />
                <TextInput
                  style={stylesComponent.textImputsP}
                  placeholder="Uf"
                  onChangeText={text => {
                    this.setState({ uf: text });
                  }}
                  value={this.state.uf}
                  placeholderTextColor="#808080"
                />
              </View>

              <View style={stylesComponent.box}>
                <TextInput
                  style={stylesComponent.textImputsM}
                  placeholder="Bairro"
                  onChangeText={text => {
                    this.setState({ bairro: text });
                  }}
                  value={this.state.bairro}
                  placeholderTextColor="#808080"
                />
                <TextInput
                  style={stylesComponent.textImputsM}
                  placeholder="Cidade"
                  onChangeText={text => {
                    this.setState({ cidade: text });
                  }}
                  placeholderTextColor="#808080"
                  value={this.state.cidade}
                />
              </View>

              <View style={styles.blockButtons}>
                <TouchableOpacity
                  style={styles.buttons2}
                  onPress={() => {
                    this.props.escolhaEnd
                      ? this.finalizaCompra()
                      : this.concluirCadastro(); //<-- mudar ultima função quando for cadastrar
                  }}
                >
                  <Text style={styles.txtButton}>
                    {this.props.escolhaEnd
                      ? "Usar este endereço"
                      : "Criar conta"}
                  </Text>
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
  data: state.enderecoReducer
});

const mapDispatchToProps = dispatch => ({
  //  no conceito redux convencional as actions são separadas do arquivo por questões de aprendizado resolvi colocalas dentro do mapDispachprops
  salvaDados: userDados =>
    dispatch({ type: "SALVA_DADOS", payload: userDados }),
  savePag: pag => dispatch({ type: "SALVA_PAGAMENTO", payload: pag }),
  newAdress: end => dispatch({ type: "NOVO_ENDERECO", payload: end }),
  newClienteAdress: end =>
    dispatch({ type: "ADD_ENDERECO_CLIENTE", payload: end })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CadEnderecoCliente);

const stylesComponent = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center"
  },
  textImputs: {
    marginTop: 8,
    width: "70%",
    height: 40,
    backgroundColor: "#DCDCDC",
    borderRadius: 50,
    textAlign: "center"
  },
  textImputsP: {
    marginTop: 8,
    width: "20%",
    marginLeft: 8,
    height: 40,
    backgroundColor: "#DCDCDC",
    borderRadius: 50,
    textAlign: "center"
  },
  textImputsM: {
    marginTop: 8,
    width: "46%",
    marginLeft: 8,
    height: 40,
    backgroundColor: "#DCDCDC",
    borderRadius: 50,
    textAlign: "center"
  },
  checkBox: {
    width: 100,
    alignItems: "center"
  },
  box: {
    flexDirection: "row"
  },
  pesquisar: {
    marginTop: 8,
    marginLeft: 8,
    width: "20%",
    height: 40,
    backgroundColor: "#DCDCDC",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50
  }
});
