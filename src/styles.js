import React, { Component } from "react";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  block1: {
    width: "50%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center"
  },
  imageBackground: {
    flex: 1
  },
  logo: {
    width: 230,
    height: 230
  },
  capa: {
    width:'100%',
    height: 230
  },
  textImputs: {
    marginTop: 8,
    width: "90%",
    height: 40,
    backgroundColor: "#DCDCDC",
    paddingLeft: 16,
    borderRadius: 50
  },
  blockButtons: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent:'center',
    alignItems: "center"
  },
  blockButtons1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  blockText: {
    marginTop: 12,
    width: "80%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 50
  },
  buttons1: {
    width: "45%",
    height: 40,
    marginLeft: 8,
    marginBottom: 8,
    backgroundColor: "#0093dd",
    paddingHorizontal: 16,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 50
  },
  buttons2: {
    width: "45%",
    height: 40,
    marginLeft: 8,
    marginBottom: 8,
    backgroundColor: "#ffba00",
    paddingHorizontal: 16,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 50
  },
  txt: {
    fontSize: 16,
    color: "#696969",
    paddingVertical: 15,
    textAlign: "center"
  },
  txtButton: {
    justifyContent:'center',
    alignItems: 'center',
    fontWeight: "bold",
    fontSize: 16,
    color: "#ffff"
  },
  Rsenha: {
    marginRight: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffba00"
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center"
  },
  Cconta: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: "#0093dd"
  },
  container: {
    backgroundColor: "#fafafa",
    flex: 1
    
  },
  loading: {
    backgroundColor: "#fafafa",
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
  },
  list: {
    padding: 15
  },
  itemProduto: {
    backgroundColor: "#fff",
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginBottom: 8
  },
  boxMeio: {
    flex: 1,
    flexDirection: "row",
  },
  info:{
    width:"80%",
    flexDirection: "row",

  },
  itemNome: {
    width: "60%",
    fontWeight: "bold",
    flexWrap: "wrap"
  },
  itemGrupo: {
    flexDirection:'row',
    fontSize: 12
  },
  itemUnidade: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "bold",
    color: "#0093dd"
  },
  itemPreco: {
    fontWeight: "bold",
    marginLeft: 14,
    fontSize: 16
  },
  headerButton: {
    width: 20,
    height: 20,
  },
  btnAdd: {
    marginLeft: 20,
    flex: 1,
    width: "30%",
    flexDirection: "row",
    alignItems: "flex-end",
  }
  
});
