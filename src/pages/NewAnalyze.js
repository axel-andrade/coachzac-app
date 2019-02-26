import React, { Component } from 'react';
import { ListView, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, AsyncStorage } from 'react-native';
import { Container, Textarea, Form, Item, Thumbnail, Header, Content, CheckBox, Button, List, ListItem, Text, Left, Body, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Slider } from 'react-native-elements';
const Define = require('../config/Define.js');
import api from '../services/api';

const INITIAL_VALUES = [null, null, null, null, null, null, null, null];

export default class AnalyzeWithoutVideo extends Component {


    state = {
        analyze: [],
        values: [],
        sessionToken: "",
        average: 0,
        codes: [],
        points: {},
        showButtons: false
    };

    async componentDidMount() {
        const sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));
        //this.props.navigation.state.params.playerId
        if (sessionToken) {
            this.setState({ sessionToken: sessionToken });
            alert("Avaliação salva com sucesso!");
            this.calculateAverage(this.props.navigation.state.params.points)
        }

    };

    calculateAverage(points) {
        let data = [];
        let sum = 0, cont = 0;
        for (let i in points) {
            data.push(i)
            sum += points[i];
            cont++;
        }
        sum = sum / cont;
        this.setState({ points: points, codes: data, average: sum.toFixed(1) })
        // return sum.toFixed(1);
    };

    setValues(points) {
        alert(points)
    }
    renderInfo() {

        return this.state.codes.map((data, index) => {
            return (
                <Text note style={{ fontSize: 12, color: "#269cda" }}>
                    <Text note style={{ fontSize: 12, color: '#696969' }}>{Define.nameSteps[Define.codeSteps.indexOf(data)] + ": "}</Text>
                    {this.state.points[data]}
                </Text>
            )
        });

    };
    render() {
        return (

            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <View style={{ paddingLeft: '5%', justifyContent: 'center' }}>
                        <Title style={{ color: '#269cda' }}>Resultado da Avaliação</Title>
                    </View>

                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate("Home", { page: 3 })}>
                            <Icon name="home" size={22.5} color='#E07A2F' />
                        </Button>
                    </Right>

                </Header>

                <Content padder>



                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '5%' }}>
                        <View style={styles.CircleShapeView}>

                            <Text style={{ color: '#E07A2F', fontWeight: 'bold', fontSize: 48 }}>{this.state.average} </Text>
                        </View>
                    </View>

                    <View style={{ paddingLeft: '5%', paddingTop: "5%" }}>
                        <Text note style={{ fontSize: 12, color: "#269cda" }}>
                            <Text note style={{ fontSize: 12, color: '#696969' }}>{"Atleta: "}</Text>
                            {this.props.navigation.state.params.playerName}
                        </Text>
                        <Text note style={{ fontSize: 12, color: "#269cda" }}>
                            <Text note style={{ fontSize: 12, color: '#696969' }}>{"Fundamento: "}</Text>
                            Saque
                        </Text>

                        <View style={{paddingTop:'5%'}}>
                            <Text note style={{ fontSize: 12, color: '#E07A2F' }}>{"Passos: "}</Text>
                        </View>

                        {this.renderInfo()}
                    </View>
                    <View>
                        <View style={{ padding: '5%' }}>
                            <Button block style={{ backgroundColor: '#269cda' }} onPress={() => this.props.navigation.navigate("PlayerForAnalyze")}>
                                <Text>NOVA AVALIAÇÃO</Text>
                            </Button>
                        </View>
                        <View style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                            <Button block style={{ backgroundColor: '#269cda' }}>
                                <Text>REPETIR AVALIAÇÃO</Text>
                            </Button>
                        </View>
                    </View>


                </Content>

            </Container >

        );
    }
}
const styles = StyleSheet.create({
    CircleShapeView: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        backgroundColor: 'white',
        borderColor: '#269cda',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center', paddingLeft: 10

    },

    // OvalShapeView: {
    //   marginTop: 20,
    //   width: 100,
    //   height: 100,
    //   backgroundColor: '#00BCD4',
    //   borderRadius: 50,
    //   transform: [
    //     {scaleX: 2}
    //   ]
    // },
});