import React, { Component } from 'react';
import { ListView, View, StyleSheet, TouchableOpacity, ScrollView, Alert, AsyncStorage } from 'react-native';
import { Container, Item, Thumbnail, Header, Content, Button, List, ListItem, Text, Left, Body, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const profileImage = require('../../assets/profile.png');
import ProfileModal from '../components/ProfileModal';
import PhotoModal from '../components/PhotoModal';

export default class ResultDetail extends Component {

    state = {
        analyze: [],
        existsProfileImage: false,
        modalVisible: false,
        fromListItem: true,
        modalPhotoVisible: false,
    };

    async componentDidMount() {



        await AsyncStorage.multiSet([
            ['@CoachZac:analyze', JSON.stringify(this.props.navigation.state.params.analyze)],
        ]);
        if (this.props.navigation.state.params.analyze.player.profileImage != undefined) {
            this.setState({
                analyze: this.props.navigation.state.params.analyze,
                existsProfileImage: true
            });
        }
        else {
            this.setState({
                analyze: this.props.navigation.state.params.analyze,
                existsProfileImage: false
            });
        }
    }

    render() {
        return (
            <Container>
                <Header style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', flexDirection: 'row' }}>

                    <Item style={{ justifyContent: 'center', alignItems: 'center', borderColor: 'transparent' }}>
                        <Left>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Home', {page: 2})}>
                            <Icon name="arrow-left" size={22.5} color='#269cda' />
                            </TouchableOpacity>

                        </Left>
                        
                        <Body style={{alignItems:'flex-start'}}>
                        <Text style={{ color: '#269cda', fontSize: 20 , fontWeight:'bold'}}>Avaliação</Text>
                        </Body>
                        <Left></Left>

                    </Item>

                </Header>

                <Text>{JSON.stringify(this.state.analyze)}</Text>




            </Container>
        );
    };

}

// <PhotoModal
//                     uri={this.state.analyze.player.profileImage}
//                     onClose={() => this.setState({ modalPhotoVisible: false })}
//                     visible={this.state.modalPhotoVisible}
//                 />
const styles = StyleSheet.create({
    note: {
        fontSize: 12
    },
    noteBold: {
        fontWeight: 'bold',
        color: 'black'
    },
    buttonEnviar: {
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: 115, height: 49,
        backgroundColor: '#E07A2F',

        borderRadius: 23,
    },
    icon: {
        paddingLeft: '15%', color: "#269cda"
    }
});