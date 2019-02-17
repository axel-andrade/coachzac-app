import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { View, TouchableOpacity, StyleSheet, AsyncStorage, Alert } from 'react-native';

import {
    Container,
    Content,
    Header,
    Body,
    Title,
    Form,
    Item,
    Input,
    Spinner,
    Button,
    Text,
    Footer,
    FooterTab

} from "native-base";


const FooterHome = props => {
   
    return (
    <Footer>
            <FooterTab style={{ backgroundColor: '#F1F9FF' }}>
                <Button vertical onPress={() => this.setState({ page: 1 })}>
                    <Icon name="account-multiple" size={25} style={{ color: "#269cda" }} />
                    <Text style={{ fontWeight: 'bold', fontFamily: 'Exo Medium', fontSize: 6, color: "#269cda" }}>Atletas</Text>
                </Button>
                <Button vertical onPress={() => this.setState({ page: 2 })}>
                    <Icon name="clipboard-pulse-outline" size={25} style={{ color: "#269cda" }} />
                    <Text style={{ fontWeight: 'bold', fontFamily: 'Exo Medium', fontSize: 6, color: "#269cda" }}>Resultados</Text>
                </Button>
                <Button vertical onPress={() => this.setState({ page: 3 })}>
                    <Icon name="tennis" size={25} style={{ color: "#269cda" }} />
                    <Text style={{ fontWeight: 'bold', fontFamily: 'Exo Medium', fontSize: 6, color: "#269cda" }}>Avaliar</Text>
                </Button>
                <Button vertical onPress={() => this.setState({ page: 4 })}>
                    <Icon name="calendar-clock" size={25} style={{ color: "#269cda" }} />
                    <Text style={{ fontWeight: 'bold', fontFamily: 'Exo Medium', fontSize: 6, color: "#269cda" }}>Agenda</Text>
                </Button>
                <Button vertical onPress={() => this.setState({ page: 5 })}>
                    <Icon name="settings-outline" size={25} style={{ color: "#269cda" }} />
                    <Text style={{ fontWeight: 'bold', fontFamily: 'Exo Medium', fontSize: 6, color: "#269cda" }}>Conta</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
};

export default FooterHome;