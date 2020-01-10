import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import api from "../services/api";
import { onSignIn } from "../auth";
import { styles } from "../styles";
import Icons from "react-native-vector-icons/Ionicons";
import { Card} from "react-native-paper";
import { showMessage, hideMessage } from "react-native-flash-message";
import { ProgressDialog } from "react-native-simple-dialogs";
import { connect } from "react-redux"

var imgfundo = require("../res/img/fundo_estrelas_branco.png");



 class ConfirmaDadosCliente extends Component {

  constructor(props){
    super(props)
  this.state = {
    loading:false,
    resToken: "",
    reqBody:"client_id=0427fb886275490194b06dd5176e1d61&granttype=password&scope=FullControl&username=admin&password=admin123"
   };
  }


  componentDidMount() {
    this.buscaTokenAdm()
  }

  buscaTokenAdm = async () => {
    //const response = await api.get("/listadeprodutos");
    api
      .post(
        "/oauth/access_token", // pega o tokem do usuario admin para visualizar os dados
        this.state.reqBody,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      .then(r => {
        this.setState({ resToken: r.data.access_token });
      }) // recupera token do admin
      .catch(e => {console.log(e)
        this.setState({loading:false})
      });

    // criar função dentro da requisição para chamar outra requisição para busca dos produtos e listalos na tela
  };

  fisicoOuJuridico = (tipo)=>{
    if(tipo === "Fisico"){
      return true
    }else{
      return false
    }
  }

  cadastraCliente = ()=>{

    this.setState({loading:true})

    const ClienteSDT = {
      cpf:this.props.data.cliente.cpfOrcnpj.length === 14 ? this.props.data.cliente.cpfOrcnpj : "",
      cnpj:this.props.data.cliente.cpfOrcnpj.length === 18 ? this.props.data.cliente.cpfOrcnpj : "",
      email:this.props.data.cliente.email,
      endereco:this.props.data.newEnd,
      id:"",
      primeiroNome:this.props.data.cliente.nome,
      segundoNome:this.props.data.cliente.sobrenome,
      senha:this.props.data.cliente.senha,
      telefone:this.props.data.cliente.telefone,
      tipoCliente:this.props.data.cliente.tipo
    }

    console.log(JSON.stringify({ClienteSDT}))
    api.post(
      "/rest/newUser", // pega o tokem do usuario admin para visualizar os dados
      {ClienteSDT},
      {
        headers: { "Content-Type": "application/json", Authorization:this.state.resToken }
      }
    )
    .then(r => {
      // resposta do desconto true/ false
     console.log(r.data) 
     if(r.data.Menssage.code === 78){
       this.setState({loading:false})
       showMessage({
        message: "Erro ao cadastrar",
        description: r.data.Menssage.message,
        type: "warning",
        duration:5000
      });
     }else{
      this.logarUsuario(this.props.data.cliente.email,this.props.data.cliente.senha)
     }
    }) // recupera token do admin
    .catch(e => {console.log(e)
      this.setState({loading:false})
    });
  }

  logarUsuario = (email,senha)=>{
    this.buscaToken(email,senha)
  }

  buscaToken = async (email, senha) => {
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
      })
      .catch(e => {
        console.log(e.response.data.error.message);
        showMessage({
          message: "Erro ao Logar",
          description:e.response.data.error.message,
          type: "warning",
          backgroundColor:  "#0093dd", 
        });
        this.setState({loading:false})
      });

    // criar função dentro da requisição para chamar outra requisição para busca dos produtos e listalos na tela
  };
  buscaUsuario = async usuarioGuid => {
    console.log(JSON.stringify(usuarioGuid));
    const body = JSON.stringify(usuarioGuid);
    api
      .post(
        "/rest/usuario",
        body, // guid de busca do usuario
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.props.datalogin.token
          }
        }
      )
      .then(r => {
        console.log(r.data.ClienteSDT);
        this.props.salvaDados(r.data.ClienteSDT)
        this.props.validaLogin(true)
                    onSignIn().then(() =>
                      this.props.navigation.navigate("Main")
                    );
      this.setState({loading:false})
      })
      .catch(e => {
        console.log(e);
        this.setState({loading:false})

      });

    // criar função dentro da requisição para chamar outra requisição para busca dos produtos e listalos na tela
  };

  
  render() {
    console.log(this.props)
    const {cliente , newEnd} = this.props.data
    function CardView(props) {
      return (
        <Card style={{ width: "90%", padding: 8 }} elevation={3}>
          <View style={stylesComponent.block}>
            <Text style={stylesComponent.nome}>{cliente.nome + (cliente.tipo === "Fisico" ? " " : " , ") + cliente.sobrenome}</Text>
            <Text>{cliente.cpfOrcnpj}</Text>
          </View>
          <View style={stylesComponent.blockLine}>
            <View style={stylesComponent.box1}>
              <Text style={stylesComponent.label}>Endereço: </Text>
              <Text>{newEnd.endereco}</Text>
            </View>
            <View style={stylesComponent.box2}>
              <Text style={stylesComponent.label}>Nº: </Text>
              <Text>{newEnd.numero}</Text>
            </View>
          </View>
          <View style={stylesComponent.blockLine}>
            <View style={stylesComponent.box1}>
              <Text style={stylesComponent.label}>Bairro: </Text>
              <Text>{newEnd.bairro}</Text>
            </View>
            <View style={stylesComponent.box2}>
              <Text style={stylesComponent.label}>Cep: </Text>
              <Text>{newEnd.cep}</Text>
            </View>
          </View>
          <View style={stylesComponent.blockLine}>
            <View style={stylesComponent.box1}>
              <Text style={stylesComponent.label}>Cidade: </Text>
              <Text>{newEnd.cidade}</Text>
            </View>
            <View style={stylesComponent.box2}>
              <Text style={stylesComponent.label}>Uf: </Text>
              <Text>{newEnd.uf}</Text>
            </View>
          </View>
          <View style={stylesComponent.blockLine}>
            <View style={stylesComponent.box1}>
              <Text style={stylesComponent.label}>Telefone: </Text>
              <Text>{cliente.telefone}</Text>
            </View>
            <View style={stylesComponent.box2}>
              <Text style={stylesComponent.label}>Complemento: </Text>
              <Text>{newEnd.complemento}</Text>
            </View>
          </View>
          <View style={stylesComponent.blockLine}>
            <View>
              <Text style={stylesComponent.label}>Email: </Text>
              <Text>{cliente.email}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.nav.navigate("CadDadosCliente");
            }}
          >
            <View style={stylesComponent.blockLine1}>
              <Text style={stylesComponent.txtButton}>Editar dados</Text>
              <Icons
                name={
                  Platform.OS === "ios"
                    ? "ios-arrow-round-forward"
                    : "md-arrow-round-forward"
                }
                size={20}
                style={{ color: "#ffff", paddingTop: 2 }}
              />
            </View>
          </TouchableOpacity>
        </Card>
      );
    }
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
              visible={this.state.loading}
              title="Cadastrando Usuário"
              message="Por favor, aguarde..."
            />

            <View style={styles.block}>
              <Text style={styles.title}>Confirmar Dados</Text>
              <Text style={styles.txt}>
                Para finalizar o cadastro confirme as informações abaixo
              </Text>
              <CardView nav={this.props.navigation} />
              <View style={styles.blockButtons}>
                <TouchableOpacity
                  style={styles.buttons1}
                  onPress={() => {
                    this.cadastraCliente()
                 //   onSignIn().then(()=> this.props.navigation.navigate("Main"))
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
  data: state.criarContaDadosReducer,
  datalogin: state.loginReducer

});

const mapDispatchToProps = dispatch => ({
  salvaToken: token => dispatch({ type: "SALVA_TOKEM", payload: token }),
  salvaDados: userDados => dispatch({ type: "SALVA_DADOS", payload: userDados }),
  validaLogin: logar => dispatch({ type: "LOGAR", payload:logar }),
  loading: () => dispatch({ type: "LOADING", payload: {} })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmaDadosCliente);

const stylesComponent = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  blockLine: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingLeft: 22,
    paddingVertical: 4
  },
  blockLine1: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    margin: 16
  },
  label: {
    fontWeight: "bold"
  },
  box1: {
    width: "60%"
  },
  box2: {
    width: "40%"
  },
  txtButton: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
    marginRight: 4,
    color: "#0093dd"
  },
  nome:{
    fontSize:28,
    fontWeight:"bold",
    fontStyle:'italic',
  }
});
