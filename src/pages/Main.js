import React, { Component } from 'react';
import { NetInfo, StyleSheet, View, TouchableOpacity, Image, AsyncStorage, ActivityIndicator } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import api from '../services/api';

export default class Main extends Component {

    state = {
        sessionToken: null
    };

    async componentDidMount() {
        const sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));
        if (sessionToken != null)
            this.setState({ sessionToken: sessionToken });
    };

    isLoggedIn = () => {

        setTimeout(() => {
            api.post('/isLoggedIn', {
                _ApplicationId: 'coachzacId',
                _SessionToken: this.state.sessionToken
            }).then((res) => {
                this.props.navigation.navigate("Home");
            }).catch((e) => {
                
                if (!e.response) {
                    //errro de internet 
                    if(this.state.sessionToken==null)
                        this.props.navigation.navigate("Login");
                    else
                        this.props.navigation.navigate("Home", {page: 3});
                } else {
                    //erro da api
                    this.props.navigation.navigate("Login");
                }
          
            });

        }, 3000);

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>

                {this.isLoggedIn()}
                <Image style={styles.logoSize} source={require('../../assets/logo.png')} />


                <ActivityIndicator style={{ padding: 20 }} size='large' color="#C9F60A" />



            </View>


        );
    }
}

const styles = StyleSheet.create({

    logoSize: {
        width: wp('75%'), height: hp('13%'),
    },
});

