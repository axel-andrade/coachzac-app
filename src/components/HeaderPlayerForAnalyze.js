import React, { Component } from 'react';
import { ListView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Item, Thumbnail, Header, Content, Button, List, ListItem, Text, Left, Body, Right, Title, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// export default class HeaderPlayerForAnalyze extends Component {

//     render() {
//         return (
//             <Header style={{ backgroundColor: 'white' }}>

//                 <Button transparent onPress={() => this.props.navigation.navigate("Home", { page: 3})}>
//                     <Icon name="arrow-left" size={22.5} color='#269cda' />
//                 </Button>

//                 <Body style={{ paddingLeft: '5%' }}>
//                     <Title style={{ color: '#269cda' }}> Avaliar Atleta</Title>
//                     <Text style={{ fontSize: 10, color: '#269cda' }}>Selecione um(a) atleta para avaliação: </Text>
//                 </Body>

//                 <Button transparent>
//                     <Icon name="tune" size={22.5} color='#269cda' />
//                 </Button>

//             </Header>
//         );
//     };

// }

const HeaderPlayerForAnalyze = props => {

    const { navigation } = props;

    return (
        <Header style={{ backgroundColor: 'white' }}>

            <Button transparent onPress={() => navigation.navigate("Home", { page: 3 })}>
                <Icon name="arrow-left" size={22.5} color='#269cda' />
            </Button>

            <Body style={{ paddingLeft: '5%' }}>
                <Title style={{ color: '#269cda' }}> Avaliar Atleta</Title>
                <Text style={{ fontSize: 10, color: '#269cda' }}>Selecione um(a) atleta para avaliação: </Text>
            </Body>

            <Button transparent>
                <Icon name="tune" size={22.5} color='#269cda' />
            </Button>

        </Header>

    );

};

export default HeaderPlayerForAnalyze;


