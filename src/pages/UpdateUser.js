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
    Thumbnail,
    Item,
    DatePicker
} from "native-base";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api';
import { NavigationActions, StackActions } from 'react-navigation';
import { TapGestureHandler } from 'react-native-gesture-handler';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home', params: { page: 5 } })],
});

export default class updateUser extends Component {

    state = {
        name: "",
        email: "",
        club: "",
        dateOfBirth: "",
        sessionToken: "",
        error: false,
        errorMessage: "",
        chosenDate: null,
        hasDate: true,
    };

    async componentDidMount() {

        const sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));
        const user = JSON.parse(await AsyncStorage.getItem('@CoachZac:user'));

        this.setState({
            sessionToken: sessionToken ? sessionToken : null,
            name: user.name,
            email: user.email,
            club: user.team,
            dateOfBirth: user.dateOfBirth,
        });
    };


    updateUser = async () => {

        api.post('/updateUser', {

            _ApplicationId: 'coachzacId',
            _SessionToken: this.state.sessionToken,
            name: this.state.name,
            email: this.state.email,
            team: this.state.club,
            dateOfBirth: this.state.dateOfBirth,

        }).then((res) => {
            const user = res.data.result;
            AsyncStorage.multiSet([
                ['@CoachZac:user', JSON.stringify(user)],
            ]);

            this.props.navigation.dispatch(resetAction);

        }).catch((e) => {

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
        let { name, email, dateOfBirth, club } = this.state;
        return (
            <Container style={{ backgroundColor: 'white' }}>

                <Header style={{ backgroundColor: 'white' }}>

                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-left" size={22.5} color='#269cda' />
                    </Button>

                    <Body style={{ paddingLeft: "5%" }}>
                        <Text style={{ color: '#269cda', fontSize: 20, fontWeight: 'bold' }}>Editar Meus Dados</Text>
                    </Body>

                </Header>

                <Content>

                    <View style={{ paddingLeft: '5%', paddingRight: '5%' }}>
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

                    </View>
                    
                    <View style={{paddingLeft:'5%',paddingRight:'5%', paddingBottom:0}}>
                    <Text style={{ color: "#269cda", fontSize: 12 }}>{"Data de nascimento "}</Text>
                    </View>
                    <View style={{ paddingRight: '5%', paddingLeft: '2%' }}>
                        <DatePicker
                            defaultDate={this.props.navigation.state.params.chosenDate}
                            minimumDate={new Date(1930, 1, 1)}
                            maximumDate={new Date(2012, 12, 31)}
                            locale={"pt-BR"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            //placeHolderText="Selecione uma data"
                            textStyle={{ color: "#555555" }}
                            // placeHolderTextStyle={{ color: "#E07A2F", fontSize: 12 }}
                            onDateChange={(newDate) => this.setDate(newDate)}
                            disabled={false}


                        />
                        
                    </View>
                    <View style={{ paddingLeft: '5%',paddingRight:'5%', width: "100%"}}>
                        <View style={{ borderBottomColor: '#269cda', borderBottomWidth: 0.5 }} />
                    </View>

                </Content>

                <View style={{ padding: '5%' }}>
                    <Button block style={{ backgroundColor: '#269cda' }} onPress={this.updateUser}>
                        <Text>SALVAR</Text>
                    </Button>
                </View>


            </Container>


        );
    }
}