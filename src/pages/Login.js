import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, AsyncStorage, Alert } from 'react-native';
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
    Footer
} from "native-base";

import { NavigationActions, StackActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api';

export default class Login extends Component {

    state = {
        sessionToken: null,
        loggedIn: false,
        login: "",
        password: "",
        hidePassword: true
    };

    logIn = async () => {

        this.setState({ loggedIn: true });

        api.post('/logIn', {

            _ApplicationId: 'coachzacId',
            login: this.state.login,
            password: this.state.password

        }).then((res) => {
            const user = res.data.result;
            AsyncStorage.multiSet([
                ['@CoachZac:sessionToken', JSON.stringify(user.sessionToken)],
                ['@CoachZac:user', JSON.stringify(user)],
                ['@CoachZac:configPlayer', JSON.stringify({ hasChangePlayer: true })],
                ['@CoachZac:configAnalyze', JSON.stringify({ hasChangeAnalyze: true })]
            ]);

            const actionHome = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home', params: { page: 3 } })],
            });

            this.props.navigation.dispatch(actionHome)

        }).catch((e) => {
            this.setState({ loggedIn: false, login: "", password: "" });
            Alert.alert(JSON.stringify(e.response.data.error));
        });

    };

    render() {

        let { login } = this.state;
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <Content>
                    <View style={{alignItems:'center',paddingTop:  hp('15%'), paddingBottom: hp('5%') }}>
                        <Image style={styles.logoSize} source={require('../../assets/logomini.png')} />
                    </View>
                    <View style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                        <Item style={{ borderColor: '#269cda' }}>
                            <Icon active name='account' size={23} style={{ color: '#269cda' }} />
                            <Input
                                placeholder='Username'
                                style={{ fontFamily: 'Exo Medium', color: '#269cda' }}
                                placeholderTextColor='#269cda'
                                value={this.state.login}
                                onChangeText={text => this.setState({ login: text })}
                            />
                        </Item>
                    </View>

                    <View style={{ paddingLeft: '5%', paddingRight: '5%', paddingBottom: '3%' }}>
                        <Item style={{ borderColor: '#269cda', paddingTop: 5 }}>
                            <Icon active name='lock' size={23} style={{ color: '#269cda' }} />
                            <Input
                                secureTextEntry={this.state.hidePassword}
                                placeholder='Password'
                                style={{ fontFamily: 'Exo Medium', color: '#269cda' }}
                                placeholderTextColor='#269cda'
                                value={this.state.password}
                                onChangeText={text => this.setState({ password: text })}
                            />
                             {this.state.hidePassword
                             ?<Icon active name='eye' size={23} style={{ color: '#269cda' }} onPress={()=> this.setState({hidePassword: !this.state.hidePassword})} />
                             : <Icon active name='eye-off' size={23} style={{ color: '#269cda' }} onPress={()=> this.setState({hidePassword: !this.state.hidePassword})} /> 
                             }
                        </Item>
                    </View>



                    <Item style={{ borderColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.navigate('SignUp')}>
                                <Text uppercase={false} style={{ fontSize: 12, color: 'gray' }}>Cadastrar</Text>
                            </Button>
                        </Left>
                        <Body></Body>

                        <Button transparent onPress={() => this.props.navigation.navigate('RecoverPassword')}>
                            <Text uppercase={false} style={{ fontSize: 12, color: 'gray' }}>Esqueci minha senha ?</Text>
                        </Button>

                    </Item>






                    <View style={{ padding: '5%', paddingBottom: '2%' }}>
                        <Button block style={{ backgroundColor: '#E07A2F' }} onPress={this.logIn}>
                            <Text uppercase={false}>Login</Text>
                        </Button>
                    </View>

                    <View style={{ padding: '5%', paddingTop: 0 }}>
                        <Button block style={{ backgroundColor: '#269cda' }} onPress={this.logIn}>
                            <Text uppercase={false}>f</Text>
                        </Button>
                    </View>
                </Content>

                {this.state.loggedIn ? <Spinner color='#C9F60A' /> : null}

            </Container>




        );
    }
}

const styles = StyleSheet.create({

    logoSize: {
        width: wp('75%'), height: hp('13%'),
    },
});

/*import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, KeyboardAvoidingView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import RF from 'react-native-responsive-fontsize';

export default class Login extends Component {

    componentDidMount() {
        loc(this);
      }

    componentWillUnMount() {
        rol();
    }
    static navigationOptions = {
        header: null
    };

    state = {
        email: '',
        senha: '',
        cont: 0,
    };

    handleLogin = () => {
        this.props.navigation.navigate("Principal")
    };

    handleContador = () => {
        this.setState({
            cont: this.state.cont + 1
        });
    };

    handleInputEmail = email => {
        this.setState({ email });
    };

    handleInputSenha = senha => {
        this.setState({ senha });
    };


    render() {

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                //flexDirection:'row',
                backgroundColor: '#FFF',
                flexDirection: 'column',
                alignItems: 'center',
            },
            formSize: {
                width: wp('71%'), height: hp('5%')
            },
            inputForm: {
                alignItems: 'flex-start',
                paddingTop: 8,
                paddingLeft: 45,
                paddingBottom: 8,
                color: '#269cda',
                fontFamily: 'Exo Medium',
                fontSize: RF(2.5),
            },
            textEsqueci: {
                paddingLeft: wp('15%'), fontSize: RF(2), fontFamily: 'Exo Medium', color: '#269cda'
            },
            textCadastrar: {
                paddingRight: wp('10%'), fontSize: RF(2), fontFamily: 'Exo Medium', color: '#269cda'
            },
            button: {
                borderWidth: 1,
                borderColor: '#FFF',
                alignItems: 'center',
                justifyContent: 'center',
                width: wp('30%'), height: hp('7%'),
                // width: 155, height: '27%',
                borderRadius: 23,
            },
            positionLogin: {
                alignItems: 'center', paddingBottom: hp('1%')
            },
            positionFacebook: {
                alignItems: 'center', paddingBottom: hp('7%'),
            },
            viewCadastrarEsqueci: {
                paddingTop: '15%',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center'
            },
            viewLogo: {
                paddingTop: '20%', alignItems: 'center',
            },
            logoSize: {
                width: wp('70%'), height: hp('10%'),
            },
            colorButtonL: {
                backgroundColor: '#E07A2F',
            },
            colorButtonF: {
                backgroundColor: '#269cda',
            },
            textButton: {
                fontFamily: 'Exo Bold',
                fontSize: wp('5%'),
                color: 'white'
            },


        });

        const txtStyle = this.state.cont % 2 === 0 ? { color: 'red' } : { color: 'green' }

        return (
            <View
                //source={require('../../assets/federer.jpg')}
                //imageStyle={{resizeMode: 'stretch'}}
                style={styles.container}

            >

                <View style={styles.viewLogo}>
                    <Image style={styles.logoSize} source={require('../../assets/logo.png')} />
                </View>

                <KeyboardAvoidingView style={{ paddingTop: hp('15%'), alignItems: 'center' }} behavior='padding'>
                    <View style={{ paddingBottom: hp('1%') }}>
                        <ImageBackground style={styles.formSize} source={require('../../assets/user.png')}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#269cda"
                                style={styles.inputForm}
                                value={this.state.email}
                                onChangeText={this.handleInputEmail}
                                returnKeyType="send"
                            // onSubmitEditing={this.handleLogin}

                            />
                        </ImageBackground>
                    </View>
                    <View style={{ paddingTop: hp('1%'), alignItems: 'center' }}>
                        <ImageBackground style={styles.formSize} source={require('../../assets/password.png')}>

                            <TextInput
                                placeholder="Senha"
                                placeholderTextColor="#269cda"
                                style={styles.inputForm}
                                value={this.state.senha}
                                onChangeText={this.handleInputSenha}
                            />

                        </ImageBackground>
                    </View>
                </KeyboardAvoidingView>

                <View style={styles.viewCadastrarEsqueci}>

                    <View>

                        <Text style={styles.textCadastrar} onPress={() => this.props.navigation.navigate('CadastroT')}>Cadastrar</Text>

                    </View>

                    <View>
                        <Text style={styles.textEsqueci} onPress={() => this.props.navigation.navigate('RSenha')}>Esqueci minha senha?</Text>
                    </View>
                </View>

                <View style={{justifyContent: 'center'}}>

                    <View style={styles.positionLogin}>
                        <TouchableOpacity style={[styles.button, styles.colorButtonL]} onPress={this.handleLogin}>
                            <Text style={styles.textButton}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.positionFacebook}>
                        <TouchableOpacity style={[styles.button, styles.colorButtonF]} onPress={this.handleContador}>
                            <Text style={styles.textButton}>f</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: -1, alignItems: 'flex-end', paddingBottom: '30%', paddingRight: '5%' }}>

                    <TouchableOpacity>
                        <View style={styles.buttonEnviar}>

                            <Text style={{ fontFamily: 'Exo Bold', color: 'white' }}>Cadastrar</Text>

                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={txtStyle}>{this.state.cont}</Text>



            </View>



        )
    }
}
*/