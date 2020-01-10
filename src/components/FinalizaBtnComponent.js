import React, { Component } from "react";
import { Text, View, TouchableOpacity, Platform, StyleSheet,Image } from "react-native";
import Icons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import {getUser} from "../auth"
import {Dialog } from "react-native-simple-dialogs";

class FinalizaBtnComponet extends Component {

  constructor(props){
    super(props)
    this.state = {
      login:false,
      showDialog:false
    }
  }

  testaCarrinho = () => {
    if (this.props.cartItens.pedidoItems.length > 0) {
      return true;
    }
    return false;
  };

  componentDidMount(){
    getUser("userData").then(res => {
      console.log(res)
      if(res !== 'none'){
        this.setState({login:true})
      }else{
        this.setState({login:false})
      }
      //this.setState({userData:data});
    }).catch(e => console.log(e));
  }

  FinalizaCompra = ()=>{
    
    this.props.useEndPadrao()
     this.props.nav.navigate("FinalizaCompra") 
  }
  EnderecoDados = ()=>{

    console.log(this.state.login)
    if(this.state.login){
      this.props.nav.navigate("EscolhaEndereco")  
    }else{
      this.setState({showDialog:true  })
    }
    
  }

  render() {
    return (
      <View >
        <Dialog
                animationType="fade"
                contentStyle={
                    {
                        alignItems: "center",
                        justifyContent: "center",
                    }
                }
                onTouchOutside={ () =>{this.setState({showDialog:false})}}
                visible={ this.state.showDialog }
            >
                <Image
                    source={
                        {
                            uri: "http://www.estrelafrios.com.br/wp-content/uploads/2016/08/logo.png",
                        }
                    }
                    style={
                        {
                            width: 200,
                            height: 160,
                            marginTop: 10,
                            resizeMode: "contain",
                        }
                    }
                    />
                    <Text style={ { textAlign:"center",marginVertical: 15,}}>
                        Não e possivel continuar sem uma conta ativa no app. para continuar faça login ou crie um conta
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={styleComponent.layoutButton1}
                        onPress={() => {
                          this.props.nav.navigate('CriarConta')
                        }}
                      >
                        <Text style={styleComponent.textButton}>
                        Criar Conta
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styleComponent.layoutButton2}
                        onPress={() => {
                          this.props.nav.navigate('Login')}}
                      >
                        <Text style={styleComponent.textButton2}>
                        Logar
                        </Text>
                      </TouchableOpacity>
                   </View>
                    
                </Dialog>
        {this.testaCarrinho() && (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styleComponent.layoutButton}
              onPress={() => {
                this.props.continuar ? this.FinalizaCompra() : this.EnderecoDados()}}
            >
              
              <Icons
                name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
                size={25}
                style={{ color: "#ffff", margin: 2 }}
              />

              <Icons
                name={Platform.OS === "ios" ? "ios-arrow-forward" : "md-arrow-dropright"}
                size={25}
                style={{ color: "#ffff", marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItens: state.carrinhoReducer,
    data: state.enderecoReducer
  };
};


const mapDispatchToProps = dispatch => ({
  //  no conceito redux convencional as actions são separadas do arquivo por questões de aprendizado resolvi colocalas dentro do mapDispachprops
  useEndPadrao: () =>
    dispatch({ type: "ENDERECO_PADRAO", payload: {}}),
  // APLICAR DESCONTO NO VALOR FINAL CRIANDO OUTRO REDUCER COM TODOS OS DADOS NECESSARIOS PARA FINALIZAR O PEDIDO
});

export default connect(mapStateToProps , mapDispatchToProps)(FinalizaBtnComponet);

const styleComponent = StyleSheet.create({

  textButton:{
    fontWeight: "bold",
    color: "#FFF",
  },
  textButton2:{
    fontWeight: "bold",
    color: "#0093dd",
  },
  layoutButton:{
    paddingHorizontal: 18,
    flexDirection: "row",
    backgroundColor: "#ffba00",
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 50,   
    marginRight: 8
  },
  layoutButton1:{
    width:"45%",
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "#ffba00",
    justifyContent:'center',
    alignItems:'center',
    padding:5,
    borderRadius: 50,   
    marginRight: 8
  },
  layoutButton2:{
    width:"45%",
    marginLeft: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    borderColor: "#0093dd",
    justifyContent:'center',
    alignItems:'center',
    padding:5,
    borderWidth: 2,
    borderRadius: 50,
    marginRight: 8
  }

});
