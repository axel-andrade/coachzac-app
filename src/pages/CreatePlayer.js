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
    Label,
    Footer,
    CheckBox,
    ListItem,
    Thumbnail,
    Picker
} from "native-base";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api';
import ProfileModal from '../components/ProfileModal';
const profileImage = require('../../assets/profile.png');
//Funções do Parse
const Parse = require('parse/react-native');
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('coachzacId');
Parse.serverURL = 'https://coachzac-v2-api.herokuapp.com/use';


export default class CreatePlayer extends Component {
    state = {
        name: "",
        email: "",
        dateOfBirth: "",
        weight: "",
        height: "",
        genre: "",
        phone: "",
        adress: "",
        profileImage: null,
        error: false,
        errorMessage: "",
        modalVisible: false,
        genre: "key1",
        existsProfileImage: false,
        photoURL: "",
        sessionToken: ""
    };

    onValueChange(value) {
        this.setState({
            genre: value
        });
    };

    saveProfileImage = async () => {
        const image = JSON.parse(await AsyncStorage.getItem('@CoachZac:photoPlayer'));
        this.setState({ profileImage: image, existsProfileImage: true });
    };

    async componentDidMount() {

        const sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));
        if (sessionToken != null)
            this.setState({ sessionToken: sessionToken });

        if (this.state.profileImage != null)
            this.setState({ existsProfileImage: true });

    };

    createPlayer = async () => {

        //se existe foto fazer upload para salva junto com os dados do atleta
        if (this.state.existsProfileImage) {
            this.uploadPhoto(this.state.profileImage)
        }
        else
            this.callRequest(undefined);

    };

    callRequest = async (url) => {

        api.post('/createPlayer', {

            _ApplicationId: 'coachzacId',
            _SessionToken: this.state.sessionToken,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            team: this.state.club,
            dateOfBirth: this.state.dateOfBirth,
            weight: this.state.weight,
            height: this.state.height,
            genre: this.state.genre,
            phone: this.state.phone,
            adress: this.state.adress,
            profileImage: url

        }).then((res) => {
            Alert.alert("Atleta cadastrado com sucesso!");
            this.props.onSaved();
        }).catch((e) => {
            //limpar campos
            this.setState({
                error: true,
                name: "",
                email: ""
            });
            Alert.alert(JSON.stringify(e.response.data.error));
        });

    };

    uploadPhoto = async (response) => {

        let parseFile = new Parse.File("profile.jpg", { base64: response.data });
        const result = await parseFile.save();
        //resultado esta vindo alterado
        let temp = JSON.stringify(result).split('https');
        let url = temp[1];
        url = url.substr(0, (url.length - 2));
        url = "https" + url;

        this.callRequest(url);

    };



    render() {
        return (


            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("Home", { page: 1 })}>
                            <Icon name="arrow-left" size={22.5} color='#269cda' />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: '#269cda', fontSize: 20, fontWeight: 'bold' }}>Cadastrar</Text>
                    </Body>
                    <Right>
                        <Button small style={{backgroundColor:"#E07A2F", borderRadius:24}} onPress={this.createPlayer}>
                            <Text style={{color:'white'}}>SALVAR</Text>
                        </Button>
                    </Right>
                </Header>
                <Content padder >
                    <Item style={{ borderColor: 'white' }}>
                        <Left style={{ alignItems: 'flex-start', flexDirection: 'column', paddingLeft: '3%' }}>
                            <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
                                {this.state.existsProfileImage
                                    ? <Thumbnail large source={{ uri: this.state.profileImage.path }} />
                                    : <Thumbnail large source={profileImage} />
                                }
                            </TouchableOpacity>

                        </Left>
                    </Item>
                    <Form>
                        <Item style={{ borderColor: '#269cda' }}>
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
                        <Item style={{ borderColor: '#269cda' }}>

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
                                placeholder='Peso'
                                style={{ fontFamily: 'Exo Medium', color: '#269cda' }}
                                placeholderTextColor='#269cda'
                                value={this.state.weight}
                                onChangeText={text => this.setState({ weight: text })}
                            />
                        </Item>
                    </Form>
                    <Form>
                        <Item style={{ borderColor: '#269cda' }}>

                            <Input
                                placeholder='Altura'
                                style={{ fontFamily: 'Exo Medium', color: '#269cda' }}
                                placeholderTextColor='#269cda'
                                value={this.state.height}
                                onChangeText={text => this.setState({ height: text })}
                            />
                        </Item>
                    </Form>
                    <Form>
                        <Item style={{ borderColor: '#269cda' }}>

                            <Input
                                placeholder='Telefone'
                                style={{ fontFamily: 'Exo Medium', color: '#269cda' }}
                                placeholderTextColor='#269cda'
                                value={this.state.phone}
                                onChangeText={text => this.setState({ phone: text })}
                            />
                        </Item>
                    </Form>
                    <Form>
                        <Item style={{ borderColor: '#269cda' }}>

                            <Input
                                placeholder='Endereço'
                                style={{ fontFamily: 'Exo Medium', color: '#269cda' }}
                                placeholderTextColor='#269cda'
                                value={this.state.adress}
                                onChangeText={text => this.setState({ adress: text })}
                            />
                        </Item>
                    </Form>
                    <Form style={{ paddingLeft: 5 }}>
                        <Item style={{ borderColor: 'white' }}>
                            <Left>
                                <Text style={{ color: "#269cda", fontSize: 18 }}>Sexo</Text>
                            </Left>
                            <Picker
                                mode="dropdown"
                                placeholder="Select your SIM"
                                iosIcon={<Icon name="arrow-down" />}
                                placeholder="Select your SIM"
                                textStyle={{ color: "#269cda" }}
                                itemStyle={{
                                    backgroundColor: "white",
                                    marginLeft: 0,
                                    paddingLeft: 10
                                }}
                                itemTextStyle={{ color: '#269cda' }}
                                style={{ width: undefined, color: '#269cda' }}
                                selectedValue={this.state.genre}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Picker.Item label="Feminino" value="female" />
                                <Picker.Item label="Masculino" value="male" />
                                <Picker.Item label="Outro" value="outher" />

                            </Picker>
                        </Item>
                    </Form>
                </Content>
                <ProfileModal
                    onSave={this.saveProfileImage}
                    onClose={() => this.setState({ modalVisible: false })}
                    visible={this.state.modalVisible}
                    typeUser={2}
                />
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
        width: 140, height: 49,
        backgroundColor: '#E07A2F',
        borderRadius: 23,

    },
    textForm: {
        fontFamily: 'Exo Medium', color: '#269cda', fontSize: 14
    }
});