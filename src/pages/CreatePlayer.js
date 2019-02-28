import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import {
    Container,
    Content,
    Header,
    Body,
    Button,
    Text,
    Left,
    Right,
    Thumbnail
} from "native-base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api';
import ProfileModal from '../components/ProfileModal';
import { NavigationActions, StackActions } from 'react-navigation';

const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home', params: {page: 1}})],
});
   
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
        address: "",
        profileImage: null,
        error: false,
        errorMessage: "",
        modalVisible: false,
        existsProfileImage: false,
        photoURL: "",
        sessionToken: ""
    };

    onValueChange(value) {
        let genre;
        if (value === "Masculino")
            genre = "male"
        if (value === "Feminino")
            genre = "female"
        if (value === "Outro")
            genre = "outher"
        this.setState({ genre: genre });
    };

    saveProfileImage = async () => {
        const image = JSON.parse(await AsyncStorage.getItem('@CoachZac:photoPlayer'));
        this.setState({ profileImage: image, existsProfileImage: true });
    };

    async componentDidMount() {

        const sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));
        if (sessionToken != null)
            this.setState({
                 sessionToken: sessionToken ? sessionToken : null,
                 existsProfileImage: this.state.profileImage? true: null,
             });

      

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
        const { params } = this.props.navigation.state;
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
            adress: this.state.address,
            profileImage: url

        }).then((res) => {
            AsyncStorage.setItem('@CoachZac:configPlayer', JSON.stringify({hasChangePlayer: true}));
            this.props.navigation.dispatch(resetAction)
            Alert.alert("Atleta cadastrado com sucesso!");
        }).catch((e) => {
            // //limpar campos
            // this.setState({
            //     error: true,
            //     name: "",
            //     email: ""
            // });
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

        let { name, email, dateOfBirth, weight, height, phone, address, genre } = this.state;
        let data = [{ value: 'Feminino' }, { value: 'Masculino' }, { value: 'Outro' }];
        return (

            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-left" size={22.5} color='#269cda' />
                        </Button>
                    
                    <Body style={{paddingLeft:'5%'}}>
                        <Text style={{ color: '#269cda', fontSize: 20, fontWeight: 'bold' }}>Cadastrar Atleta</Text>
                    </Body>
                  
                </Header>
                <Content>
                    <View style={{ padding: '5%', }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
                                {this.state.existsProfileImage
                                    ? <Thumbnail large source={{ uri: this.state.profileImage.path }} />
                                    : <Thumbnail large source={profileImage} />
                                }
                            </TouchableOpacity>
                        </View>

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
                            label="Data de nascimento"
                            textColor='#555555'
                            labelHeight={20}
                            tintColor='#E07A2F'
                            baseColor='#269cda'
                            value={dateOfBirth}
                            onChangeText={(dateOfBirth) => this.setState({ dateOfBirth })}
                        />

                        <TextField
                            label="Peso"
                            textColor='#555555'
                            labelHeight={20}
                            tintColor='#E07A2F'
                            baseColor='#269cda'
                            value={weight}
                            onChangeText={(weight) => this.setState({ weight })}
                        />

                        <TextField
                            label="Altura"
                            textColor='#555555'
                            labelHeight={20}
                            tintColor='#E07A2F'
                            baseColor='#269cda'
                            value={height}
                            onChangeText={(height) => this.setState({ height })}
                        />

                        <TextField
                            label="Telefone"
                            textColor='#555555'
                            labelHeight={20}
                            tintColor='#E07A2F'
                            baseColor='#269cda'
                            value={phone}
                            onChangeText={(phone) => this.setState({ phone })}
                        />

                        <TextField
                            label="Endereço"
                            textColor='#555555'
                            labelHeight={20}
                            tintColor='#E07A2F'
                            baseColor='#269cda'
                            value={address}
                            onChangeText={(address) => this.setState({ address })}
                        />

                        <Dropdown
                            label='Sexo'
                            textColor='#555555'
                            labelHeight={20}
                            tintColor='#E07A2F'
                            baseColor='#269cda'
                            selectedItemColor='#269cda'
                            value={genre}
                            onChangeText={(genre) => this.onValueChange(genre)}
                            data={data}
                        />

                    </View>
                </Content>
                
                <View style={{padding:'5%'}}>
                <Button block style={{ backgroundColor: '#269cda' }} onPress={() => this.createPlayer()}>
                    <Text uppercase={false}>Salvar</Text>
                </Button>
                </View>

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