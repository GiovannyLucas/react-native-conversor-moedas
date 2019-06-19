/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import axios from "axios";
import React, {Component} from 'react';
import {StyleSheet, ImageBackground, Text, View, TouchableOpacity, Picker, TextInput } from 'react-native';


export default class App extends Component {
  state = {
    moeda: "",
    valor: 0,
    convertido: 0
  }

  handleConvert = () => {
    if (this.state.moeda == "") {
      alert("Por favor, selecione uma moeda!");
    } else {
      axios.get(`https://economia.awesomeapi.com.br/json/${this.state.moeda}`)
      .then(res => {
        this.setState({convertido: (res.data[0].ask * this.state.valor)});
        
      })
      .catch(err => {
        alert(err);
      })
    }  
  }


  render() {
    return (
      
      <View style={styles.container}>
        
        <Text style={styles.title}>Conver$or de moedas</Text>

        <TextInput 
          style={styles.input}
          keyboardType="numeric"
          placeholder="Valor: R$"
          onChangeText={(valor) => this.setState({valor: valor})}
        />

        <Picker 
          style={styles.picker}
          selectedValue={this.state.moeda}
          style={{height: 50, width: 350}}
          onValueChange={(itemValue) => 
          this.setState({moeda : itemValue})}
        >
            <Picker.Item label="Selecione uma moeda" value="" />
            <Picker.Item label="Euro" value="EUR" />
            <Picker.Item label="Dólar" value="USD" />

        </Picker>
    
        <TouchableOpacity onPress={this.handleConvert} style={styles.button}>
          <Text style={styles.textButton}>Converter</Text>
        </TouchableOpacity>
        <Text style={styles.textConvertido}>{this.state.convertido}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 20,
    color: "#000"
  },
  input: {
    borderRadius: 20,
    backgroundColor: "#ddd",
    width: "60%",
    borderWidth: 1
  },
  picker: {
    borderWidth: 2,
    width: "100%"
  },
  button: {
    backgroundColor: "#0FC",
    width: "30%",
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  textButton: {
    justifyContent: "center",
    alignItems: "center", 
    color: "#FFF"
  },
  textConvertido: {
    color: "#000",
    fontSize: 15
  }
});
