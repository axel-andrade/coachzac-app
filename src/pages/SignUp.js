import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
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
    Left,
    Right,
    Icon,
    Label,
    Footer
} from "native-base";

import api from '../services/api';

export default class SignUp extends Component {

    state = {
        name: "",
        email: "",
        club: "",
        dateOfBirth: "",
        password: "",
        repeatPassword: "",
        error: false,
        errorMessage: "",
    };

    signUp = async () => {

        if (this.state.password != this.state.repeatPassword) {
            Alert.alert("Error1"); Alert.alert("Error1");
            this.setState({
                error: true,
                errorMessage: "A senha não conferem",
            });
        }

        //fazer a requisição e salvar o token e os dados do usuário e ir para pagina principal

        api.post('/createCoach', {

            _ApplicationId: 'coachzacId',
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            team: this.state.club,
            dateOfBirth: this.state.dateOfBirth,
            userGroup: "coach"

        }).then((res) => {
            const user = res.data.result;
            AsyncStorage.multiSet([
                ['@CoachZac:sessionToken', JSON.stringify(user.sessionToken)],
                ['@CoachZac:user', JSON.stringify(user)],
            ]);

            this.props.navigation.navigate('Home');

            Alert.alert(this.state.sessionToken);
        }).catch((e) => {

            this.setState({ error: true, name: "" });
            Alert.alert(JSON.stringify(e.response.data.error));
        });



    };

    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>

                <Content padder >
                    <Form>
                        <Item style={{ paddingTop: 10, borderColor: '#269cda' }}>
                            <Input
                                placeholder='Nome'
                                style={{ fontFamily: 'Exo Medium', color: '#269cda' }}
                                placeholderTextColor='#269cda'
                                value={this.state.name}
                                onChangeText={text => this.setState({ name: text })}
                            />
                        </Item>

                    </Form>
                    <Form>
                        <Item rstyle={{ borderColor: '#269cda' }}>

                            <Input
                                placeholder='Email'
                                style={{ fontFamily: 'Exo Medium', color: '#269cda' }}
                                placeholderTextColor='#269cda'
                                value={this.state.email}
                                onChangeText={text => this.setState({ email: text })}
                            />
                        </Item>
                    </Form>
                    <Form>
                        <Item style={{ borderColor: '#269cda' }}>

                            <Input
                                placeholder='Clube'
                                style={{ fontFamily: 'Exo Medium', color: '#269cda' }}
                                placeholderTextColor='#269cda'
                                value={this.state.club}
                                onChangeText={text => this.setState({ club: text })}
                            />
                        </Item>
                    </Form>
                    <Form>
                        <Item style={{ borderColor: '#269cda' }}>

                            <Input
                                placeholder='Data de nascimento'
                                style={{ fontFamily: 'Exo Medium', color: '#269cda' }}
                                placeholderTextColor='#269cda'
                                value={this.state.dateOfBirth}
                                onChangeText={text => this.setState({ dateOfBirth: text })}
                            />
                        </Item>
                    </Form>
                    <Form>
                        <Item style={{ borderColor: '#269cda' }}>

                            <Input
                                placeholder='Senha'
                                style={{ fontFamily: 'Exo Medium', color: '#269cda' }}
                                placeholderTextColor='#269cda'
                                value={this.state.password}
                                onChangeText={text => this.setState({ password: text })}
                            />
                        </Item>
                    </Form>
                    <Form>
                        <Item style={{ borderColor: '#269cda' }}>

                            <Input
                                placeholder='Repetir senha'
                                style={{ fontFamily: 'Exo Medium', color: '#269cda' }}
                                placeholderTextColor='#269cda'
                                value={this.state.repeatPassword}
                                onChangeText={text => this.setState({ repeatPassword: text })}
                            />
                        </Item>
                    </Form>


                </Content>


                <View style={{ flex: -1, alignItems: 'flex-end', paddingBottom: '30%', paddingRight: '5%' }}>

                    <TouchableOpacity onPress={this.signUp}>
                        <View style={styles.buttonEnviar}>

                            <Text style={{ fontFamily: 'Exo Bold', color: 'white' }}>Cadastrar</Text>

                        </View>
                    </TouchableOpacity>
                </View>

            </Container>


        );
    }
}

const styles = StyleSheet.create({

    buttonEnviar: {
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: 115, height: 49,
        backgroundColor: '#E07A2F',
        borderRadius: 23,
    }
});