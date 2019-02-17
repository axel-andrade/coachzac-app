
import React, { Component } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Header } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';


const Analyze = props => {

  return (
    
      <Image
        source={require('../../assets/home3.jpeg')}
        style={{height:hp('87%'),
          width:wp('100%')}}
      >
      </Image>

  );

};


const styles = StyleSheet.create({

  buttonEnviar: {
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140, height: 49,

    backgroundColor: '#E07A2F',
    borderRadius: 23,

  },
  textForm: {
    fontFamily: 'Exo Medium', color: '#269cda', fontSize: 14
  },
  logoSize: {
    width: 300, height: 300,
  },
});

export default Analyze;