import React, { Component } from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";
import Icons from "react-native-vector-icons/Ionicons";
import SearchBar from 'react-native-searchbar'; //campo de pesquisa
import CartConponent from "./cartConponent";
import { connect } from "react-redux";

class SearchConponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            itens :[]
        }
  
    }
    componentDidMount(){
        this.searchBar.hide()
    }
  _handleResults(results) {

   // console.log(results)
    console.log(this.props)
    this.atualizaLista(results)
    //this.props.addListProdutos(results)
 //   this.setState({ docs:results });
  }

  atualizaLista = (results)=>{
    console.log(this.props)
    console.log(results)
  }

  render() {
    const cont = this.props.cartItens;
    return (
        <View style={{backgroundColor:"#0093dd"}}>
        <View style={{flexDirection: 'row', height:60, backgroundColor:"#0093dd" ,marginTop: Platform.OS === "ios" ? 18 : 0}}>
            <SearchBar
                ref={(ref) => this.searchBar = ref}
                data={this.props.data.fullistaProdutos}
                backgroundColor="#0093dd"
                handleResults={(results)=>{results.length > 0 ? this.props.searchListProdutos(results) : this.props.disableSearch(); 
                    console.log(results.length)
                    
                    ; console.log(this.props.data.fullistaProdutos.length)}}
                iconColor="#FFF"
                textColor="#FFF"
                selectionColor="#FFFF"
                placeholder="Buscar Produto"
                showOnLoad/>          
            <TouchableOpacity
                 style={{ padding: 8 }}
                  onPress={() => {
                  this.props.navigation.toggleDrawer();
            }}
            >
            <Icons
              name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
              size={30}
              style={{ color: "#ffff", margin: 2 }}
            />
          </TouchableOpacity>
          <Text style={{fontSize:18, fontWeight:'bold',color:"#FFF",padding:15}}>Estrela Frios </Text>

          <View style={{ flexDirection: "row",flex:1, alignItems:'center',justifyContent:"flex-end" }}>
            <TouchableOpacity style={{ padding: 8, marginRight: 8 }} onPress={()=>{this.searchBar.show()}}>
              <Icons
                name={Platform.OS === "ios" ? "ios-search" : "md-search"}
                size={30}
                style={{ color: "#ffff", margin: 2 }}
              />
            </TouchableOpacity>
              <CartConponent nav={this.props.navigation} />
          </View>
          </View>
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.listaProdutosReducer
  };
};

const mapDispatchToProps = dispatch => ({
    addListProdutos: product => dispatch({ type: "SALVA_LISTA_PRODUTOS", payload: product }),
    searchListProdutos: product => dispatch({ type: "PESQUISA_LISTA_PRODUTOS", payload: product }),
    disableSearch: () => dispatch({ type: "DISABLE_SEARCH", payload: {} }),
  });

export default connect(mapStateToProps, mapDispatchToProps)(SearchConponent);
