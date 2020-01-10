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
  Linking,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import api from "../services/api";
import { onSignIn } from "../auth";
import { styles } from "../styles";
import { Card } from "react-native-paper";
import Icons from "react-native-vector-icons/Ionicons";

var imgfundo = require("../res/img/fundo_estrelas_branco.png");
var imglogo = require("../res/img/capa_estrela.jpg");

export default class ContatoEmpresa extends Component {

    openGps = () => {
        var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
        var url = scheme + '-20.525177, -47.372320'
        this.openExternalApp(url)
      }
    openFacebook = () => {
        
        var url = "https://www.facebook.com/EstrelaFriosdeFranca/"
        this.openExternalApp(url)
      }
    openMessage =  () => {
        
        var url = "https://www.messenger.com/t/EstrelaFriosdeFranca"
        this.openExternalApp(url)
      }

      openEmail =  () => {
        
        var url = "mailto:contato@estrelafrios.com.br"
        this.openExternalApp(url)
      }

    opemSite =  () => {
        
        var url = "http://www.estrelafrios.com.br"
        this.openExternalApp(url)
      }

    openTell =  () => {
        
        var url = 'tel://(16) 3725-1515'
        this.openExternalApp(url)
      }


      openExternalApp = (url) => {
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log('Don\'t know how to open URI: ' + url);
          }
        });
      }

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
            <Image
              source={imglogo}
              style={stylesComponent.capa}
              resizeMode="center"
            />
            <View style={styles.block}>
              <Card style={stylesComponent.card} margin={2}>
                <View style={stylesComponent.cabecalho}>
                  <Text style={stylesComponent.title}>Contato</Text>
                  <Text style={stylesComponent.title}>
                    Nossa empresa possui vários canais de atendimento para
                    melhor atendê-lo
                  </Text>
                </View>


                <View style={stylesComponent.container}>
                  <Icons
                    name={
                      Platform.OS === "ios"
                        ? "logo-facebook"
                        : "logo-facebook"
                    }
                    size={40}
                    style={{ color: "#0093dd", paddingTop: 2 , width:"20%" }}
                  />

                  <TouchableOpacity style={{width:"80%" }} onPress= {this.openFacebook}>
                      <Text style={stylesComponent.titleContainer}>
                      Conheça nossa pagina
                      </Text>
                  </TouchableOpacity>
                 
                </View>
                <View style={stylesComponent.container}>
                  <Icons
                    name={
                      Platform.OS === "ios"
                        ? "ios-send"
                        : "md-send"
                    }
                    size={40}
                    style={{ color: "#0093dd", paddingTop: 2 , width:"20%" }}
                  />

                  <TouchableOpacity style={{width:"80%" }} onPress= {this.openMessage}>
                      <Text style={stylesComponent.titleContainer}>
                      Envie uma mensagem
                      </Text>
                  </TouchableOpacity>
                </View>
                <View style={stylesComponent.container}>
                  <Icons
                    name={
                      Platform.OS === "ios"
                        ? "ios-laptop"
                        : "md-laptop"
                    }
                    size={35}
                    style={{ color: "#0093dd", paddingTop: 2 , width:"20%" }}
                    />
  
                    <TouchableOpacity style={{width:"80%" } } onPress= {this.opemSite}>
                        <Text style={stylesComponent.titleContainer}>
                        www.estrelafrios.com.br
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={stylesComponent.container}>
                  <Icons
                    name={
                      Platform.OS === "ios"
                        ? "ios-mail"
                        : "md-mail"
                    }
                    size={40}
                    style={{ color: "#0093dd", paddingTop: 2 , width:"20%" }}
                  />

                  <TouchableOpacity style={{width:"80%" }} onPress= {this.openEmail}>
                      <Text style={stylesComponent.titleContainer}>
                      estrelafriosnenfe@gmail.com
                      </Text>
                  </TouchableOpacity>
                </View>
                <View style={stylesComponent.container}>
                  <Icons
                    name={
                      Platform.OS === "ios"
                        ? "ios-call"
                        : "md-call"
                    }
                    size={40}
                    style={{ color: "#0093dd", paddingTop: 2 , width:"20%" }}
                    />
  
                    <TouchableOpacity style={{width:"80%" }} onPress= {this.openTell}>
                        <Text style={stylesComponent.titleContainer}>
                        (16) 3725-1515 ou (16) 3725-8947
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={stylesComponent.container}>
                  <Icons
                    name={
                      Platform.OS === "ios"
                        ? "ios-compass"
                        : "md-compass"
                    }
                    size={40}
                    style={{ color: "#0093dd", paddingTop: 2 , width:"20%" }}
                  />

                  <TouchableOpacity style={{width:"80%" }} onPress={this.openGps}>
                      <Text style={stylesComponent.titleContainer}>
                      Rua Ceará, 1059 - Vila Aparecida - Franca/SP\nCEP: 14401-416
                      </Text>
                  </TouchableOpacity>
                </View>
                
              </Card>
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
  },
  capa: {
    width: "100%",
    height: 137
  },
  card: {
    marginTop:8,
    width: "95%",
    padding: 12,
    elevation: 3,
    backgroundColor: "#FFF"
  },
  cabecalho: {
    alignItems: "center",
    marginVertical: 12
  },
  title: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center"
  },
  titleContainer: {
    fontWeight: "bold",
    fontSize: 18,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    margin: 10
  }
});
