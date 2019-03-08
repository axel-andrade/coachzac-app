import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
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
    Label,
    Footer,
    DatePicker
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
        chosenDate: new Date(),
        hasDate: false
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


    setDate(date) {
        this.setState({
            chosenDate: date,
            dateOfBirth: date,
            hasDate: true
        });

    };

    render() {
        let { name, email, dateOfBirth, club, password, repeatPassword } = this.state;
        return (
            <Container style={{ backgroundColor: 'white' }}>

                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-left" size={22.5} color='#269cda' />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: '#269cda', fontSize: 20, fontWeight: 'bold' }}>Cadastrar</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>

                <Content>

                    <View style={{ padding: '5%', }}>
                        <TextField
                            label="Nome"
                            textColor='#555555'
                            labelHeight={20}
                            tintColor='#E07A2F'
                            baseColor='#269cda'
                            value={name}
                            onChangeText={(name) => this.setState({ name })}
                        />
                        <TextField
                            label="Email"
                            textColor='#555555'
                            labelHeight={20}
                            tintColor='#E07A2F'
                            baseColor='#269cda'
                            value={email}
                            onChangeText={(email) => this.setState({ email })}
                        />
                        <TextField
                            label="Clube"
                            textColor='#555555'
                            labelHeight={20}
                            tintColor='#E07A2F'
                            baseColor='#269cda'
                            value={club}
                            onChangeText={(club) => this.setState({ club })}
                        />

                        <View style={{ borderColor: '#269cda', borderBottomWidth: 0.5, paddingTop: '2%' }}>
                            <Item style={{ borderColor: 'white', alignItems: 'flex-start' }}>
                                <Left style={{ alignItems: "flex-start" }}>
                                    <Text style={{ color: "#269cda", fontSize: this.state.hasDate ? 12 : 16 }}>{"Data de nascimento: "}</Text>
                                </Left>

                                <DatePicker
                                    defaultDate={new Date(2009, 12, 31)}
                                    minimumDate={new Date(1930, 1, 1)}
                                    maximumDate={new Date(2012, 12, 31)}
                                    locale={"pt-BR"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Selecione uma data"
                                    textStyle={{ color: "#555555" }}
                                    placeHolderTextStyle={{ color: "#E07A2F", fontSize: 12 }}
                                    onDateChange={(newDate) => this.setDate(newDate)}
                                    disabled={false}
                                />

                            </Item>
                        </View>


                        <TextField
                            label="Senha"
                            textColor='#555555'
                            labelHeight={20}
                            tintColor='#E07A2F'
                            baseColor='#269cda'
                            value={password}
                            onChangeText={(password) => this.setState({ password })}
                        />

                        <TextField
                            label="Repetir Senha"
                            textColor='#555555'
                            labelHeight={20}
                            tintColor='#E07A2F'
                            baseColor='#269cda'
                            value={repeatPassword}
                            onChangeText={(repeatPassword) => this.setState({ repeatPassword })}
                        />


                    </View>

                </Content>

                <View style={{ padding: '5%' }}>
                    <Button block style={{ backgroundColor: '#269cda' }} onPress={this.signUp}>
                        <Text uppercase={false}>Cadastrar</Text>
                    </Button>
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