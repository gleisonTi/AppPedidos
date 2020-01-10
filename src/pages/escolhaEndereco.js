import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActionSheetIOS,
  Picker,
} from 'react-native';
import apiCep from '../services/apicep';
import { getUser, deleteUserId } from '../auth';
import { styles } from '../styles';
import Icons from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-paper';
import CadEnderecoCliente from './cadEnderecoCliente';
import { connect } from 'react-redux';

var imgfundo = require('../res/img/fundo_estrelas_branco.png');

const TYPE_PAY = ['Credito', 'Debito', 'Dinheiro'];

class EscolhaEndereco extends Component {
  constructor(props) {
    super(props);
    this.getDataUser();
    this.state = {
      boxcad: false,
      tipoPag: '',
      userData: 'none',
    };
  }

  buscaCep = async cep => {
    const response = await apiCep.get(cep + '/json/');
    const docs = response.data;
    console.log(docs);
    this.setState({ docs });
  };

  getDataUser = async () => {
    await getUser('userData').then(res => {
      const data = JSON.parse(res);
      this.props.salvaDados(data);
      //this.setState({userData:data});
    });
  };

  mostraCad = () => {
    this.setState({ boxcad: !this.state.boxcad });
  };

  updatePag = tipoPag => {
    this.props.savePag(tipoPag);
  };

  fisicoOuJuridico = tipo => {
    if (tipo !== '') {
      return true;
    } else {
      return false;
    }
  };

  onSelectCategory() {
    ActionSheetIOS.showActionSheetWithOptions(
      { options: TYPE_PAY },
      buttonIndex => this.props.savePag(TYPE_PAY[buttonIndex])
    );
  }

  render() {
    function CardView(props) {
      return (
        <Card style={{ width: '90%', padding: 8 }} elevation={3}>
          {props.nav.data.loading && (
            <View>
              <View style={stylesComponent.block}>
                <Text style={stylesComponent.nome}>
                  {props.nav.data.userData.primeiroNome.trim()}
                </Text>
                <Text>{props.nav.data.userData.segundoNome.trim()}</Text>
                <Text>
                  {props.nav.data.userData.cpf.trim() ||
                    props.nav.data.userData.cnpj.trim()}
                </Text>
              </View>
              <View style={stylesComponent.blockLine}>
                <View style={stylesComponent.box1}>
                  <Text style={stylesComponent.label}>Endereço: </Text>
                  <Text>
                    {props.nav.data.userData.endereco.endereco.trim()}
                  </Text>
                </View>
                <View style={stylesComponent.box2}>
                  <Text style={stylesComponent.label}>Nº: </Text>
                  <Text>{props.nav.data.userData.endereco.numero.trim()}</Text>
                </View>
              </View>
              <View style={stylesComponent.blockLine}>
                <View style={stylesComponent.box1}>
                  <Text style={stylesComponent.label}>Bairro: </Text>
                  <Text>{props.nav.data.userData.endereco.bairro.trim()}</Text>
                </View>
                <View style={stylesComponent.box2}>
                  <Text style={stylesComponent.label}>Cep: </Text>
                  <Text>{props.nav.data.userData.endereco.cep.trim()}</Text>
                </View>
              </View>
              <View style={stylesComponent.blockLine}>
                <View style={stylesComponent.box1}>
                  <Text style={stylesComponent.label}>Cidade: </Text>
                  <Text>{props.nav.data.userData.endereco.cidade.trim()}</Text>
                </View>
                <View style={stylesComponent.box2}>
                  <Text style={stylesComponent.label}>Uf: </Text>
                  <Text>{props.nav.data.userData.endereco.uf.trim()}</Text>
                </View>
              </View>
              <View style={stylesComponent.blockLine}>
                <View style={stylesComponent.box1}>
                  <Text style={stylesComponent.label}>Telefone: </Text>
                  <Text>{props.nav.data.userData.telefone.trim()}</Text>
                </View>
                <View style={stylesComponent.box2}>
                  <Text style={stylesComponent.label}>Complemento: </Text>
                  <Text>
                    {props.nav.data.userData.endereco.complemento.trim()}
                  </Text>
                </View>
              </View>
              <View style={stylesComponent.blockLine}>
                <View>
                  <Text style={stylesComponent.label}>Email: </Text>
                  <Text>{props.nav.data.userData.email}</Text>
                </View>
              </View>
            </View>
          )}
        </Card>
      );
    }
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled">
        <ImageBackground
          source={imgfundo}
          style={{ width: '100%', height: '100%' }}>
          <KeyboardAvoidingView
            style={styles.imageBackground}
            behavior="padding">
            <View style={styles.block}>
              <Text style={styles.title}>Confirmar Dados</Text>
              <Text style={styles.txt}>
                Para continuar com o pedido confirme as informações abaixo
              </Text>
              <CardView nav={this.props} />
              <Card
                style={{ height: 100, margin: 8, width: '90%', padding: 8 }}
                elevation={3}>
                <Text style={styles.title}>Tipo de Pagamento</Text>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItens: 'center',
                  }}>
                  {Platform.OS === 'ios' ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={this.onSelectCategory.bind(this)}>
                        <Text style={stylesComponent.textInputStyle}>
                          {this.props.data.tipoPag}
                        </Text>
                        <Icons
                          name={
                            Platform.OS === 'ios'
                              ? 'ios-arrow-down'
                              : 'md-arrow-down'
                          }
                          size={25}
                          style={{
                            color: '#999999',
                            paddingLeft: 4,
                            marginTop: 4,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <Picker
                        selectedValue={this.props.data.tipoPag}
                        onValueChange={this.updatePag}
                        style={{
                          width: 130,
                          marginLeft: 110,
                        }}>
                        <Picker.Item label="Credito" value="Credito" />
                        <Picker.Item label="Debito" value="Debito" />
                        <Picker.Item label="Dinheiro" value="Dinheiro" />
                      </Picker>
                    </View>
                  )}
                </View>
              </Card>
              <View style={styles.blockButtons}>
                <TouchableOpacity
                  style={styles.buttons1}
                  onPress={() => {
                    this.mostraCad();
                  }}>
                  <Text style={styles.txtButton}>Outro Endereço</Text>
                </TouchableOpacity>
              </View>
              {this.state.boxcad && (
                <Card
                  style={{
                    width: '90%',
                    padding: 8,
                    marginTop: 16,
                    marginBottom: 16,
                  }}
                  elevation={3}>
                  <CadEnderecoCliente
                    escolhaEnd={true}
                    navigation={this.props.navigation}
                  />
                </Card>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  data: state.enderecoReducer,
});

const mapDispatchToProps = dispatch => ({
  //  no conceito redux convencional as actions são separadas do arquivo por questões de aprendizado resolvi colocalas dentro do mapDispachprops

  salvaDados: userDados =>
    dispatch({ type: 'SALVA_DADOS', payload: userDados }),
  savePag: pag => dispatch({ type: 'SALVA_PAGAMENTO', payload: pag }),
  newAdress: end => dispatch({ type: 'NOVO_ENDERECO', payload: end }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EscolhaEndereco);

const stylesComponent = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  blockLine: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingLeft: 22,
    paddingVertical: 4,
  },

  label: {
    fontWeight: 'bold',
  },
  box1: {
    width: '60%',
  },
  box2: {
    width: '40%',
  },
  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  textInputStyle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color:"#999999"
  },
});
