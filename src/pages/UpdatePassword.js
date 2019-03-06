import React, { Component } from 'react';
import { TouchableOpacity, Text, View, AsyncStorage, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, ListItem, Button, Header, Item, Input, Content, InputGroup, Left, Right, Thumbnail, Body, Title } from 'native-base';
import HeaderPlayer from '../components/HeaderPlayer';
import api from '../services/api';
import ProfileModal from '../components/ProfileModal';
import PhotoModal from '../components/PhotoModal';
import { NavigationActions, StackActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';

const profileImage = require('../../assets/profile.png');

export default class UpdatePassword extends Component {

    state = {
        sessionToken: "",
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: ""
    };

    async componentDidMount() {
        const sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));      
        this.setState({sessionToken: sessionToken});
    };

    editPassword(){
        if(this.state.newPassword !== this.state.repeatNewPassword){
            alert("As senhas não conferem.")
        }
        else
          this.callRequest();
    };

    callRequest = async () => {

        api.post('/editPassword', {

            _ApplicationId: 'coachzacId',
            _SessionToken: this.state.sessionToken,
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword

        }).then((res) => {
            const user = res.data.result;
            AsyncStorage.multiSet([
                ['@CoachZac:sessionToken', JSON.stringify(user.sessionToken)],
                ['@CoachZac:user', JSON.stringify(user)],
            ]);

            const actionHome = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home', params: { page: 5 } })],
            });

            this.props.navigation.dispatch(actionHome)

        }).catch((e) => {
            alert(JSON.stringify(e.response.data.error));
        });
    };

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
                        <Title style={{ color: '#269cda' }}>Alterar senha</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content>
                    <View style={{padding: '5%'}}>
                    <TextField
                        label="Senha antiga"
                        textColor='#555555'
                        labelHeight={20}
                        tintColor='#E07A2F'
                        baseColor='#269cda'
                        value={this.state.oldPassword}
                        onChangeText={(text) => this.setState({ oldPassword:  text})}
                    />
                    <TextField
                        label="Nova senha"
                        textColor='#555555'
                        labelHeight={20}
                        tintColor='#E07A2F'
                        baseColor='#269cda'
                        value={this.state.newPassword}
                        onChangeText={(text) => this.setState({ newPassword: text })}
                    />
                    <TextField
                        label="Confirma senha"
                        textColor='#555555'
                        labelHeight={20}
                        tintColor='#E07A2F'
                        baseColor='#269cda'
                        value={this.state.repeatNewPassword}
                        onChangeText={(text) => this.setState({repeatNewPassword: text})}
                    />
                    </View>
                </Content>

                <View style={{ padding: '5%' }}>
                    <Button block style={{ backgroundColor: '#269cda' }} onPress={()=>this.editPassword()}>
                        <Text style={{color:'white'}}>SALVAR</Text>
                    </Button>
                </View>

            </Container>

        );

    }
}

