import React, { Component } from 'react';
import { TouchableOpacity, Text, View, AsyncStorage, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, ListItem, Button, Header, Item, Input, Content, InputGroup, Left, Right, Thumbnail, Body, Title } from 'native-base';
import HeaderPlayer from '../components/HeaderPlayer';
import api from '../services/api';
import ProfileModal from '../components/ProfileModal';
import PhotoModal from '../components/PhotoModal';
import { NavigationActions, StackActions } from 'react-navigation';

const profileImage = require('../../assets/profile.png');

export default class AccountDetail extends Component {

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-left" size={22.5} color='#269cda' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#269cda' }}>Conta</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content>

                    <View style={{ padding:'2%'}}>
                        <ListItem>
                            <Button small transparent onPress={()=> this.props.navigation.navigate("UpdatePassword")}>
                                <View style={{ flexDirection: 'row', paddingBottom: '2%', paddingTop: '2%' }}>
                                    <Left>
                                        <Text style={{ color: '#269cda', fontSize: 14, fontWeight: 'bold' }}>Editar Senha</Text>
                                        <Text note style={{ fontSize: 12 }}>Altere sua senha utilizando sua senha antiga.</Text>
                                    </Left>
                                    <Icon name="chevron-right" size={40} color='#E07A2F' />
                                </View>
                            </Button>
                        </ListItem >
                    </View>

                    <View style={{ padding:'2%'}}>
                        <ListItem>
                            <Button small transparent>
                                <View style={{ flexDirection: 'row', paddingBottom: '2%', paddingTop: '2%' }}>
                                    <Left>
                                        <Text style={{ color: '#269cda', fontSize: 14, fontWeight: 'bold' }}>Excluir Conta</Text>
                                        <Text note style={{ fontSize: 12 }}>Exclua sua conta do aplicativo</Text>
                                    </Left>
                                    <Icon name="chevron-right" size={40} color='#E07A2F' />
                                </View>
                            </Button>
                        </ListItem >
                    </View>

                </Content>
            </Container>

        );

    }
}

