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
        playerId: "",
        steps: [],
        sessionToken: "",
        values: [],
        showComments: false,
        commentAudio: "/",
        commentsAudio: "/"
    };

    async componentDidMount() {
        const sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));

        if (sessionToken){
            this.setState({
                sessionToken: sessionToken,
                playerId: this.props.navigation.state.params.playerId,
                steps: this.props.navigation.state.params.steps,
            });

            this.initValues();
        }

    }

    changeValues(pos, value) {
        let data = this.state.values;
        data[pos] = value;

        this.setState({ values: data, showComments: true });
    };

    renderSliders(pos) {
        return (
            <View style={{ paddingLeft: '10%' }}>
                <Text style={{ fontSize: 14, color: '#E07A2F' }}>
                    <Text style={{ fontSize: 12, color: '#696969' }}>{Define.nameSteps[pos] + ": "}</Text>
                    {this.state.values[pos]}
                </Text>
                <View style={{ paddingLeft: '5%', paddingRight: '10%' }}>
                    <Slider
                        value={this.state.value}
                        onValueChange={value => this.changeValues(pos, value)}
                        minimumValue={0}
                        maximumValue={10}
                        maximumTrackTintColor={"#269cda"}
                        minimumTrackTintColor={'#269cda'}
                        thumbTintColor={"#E07A2F"}
                        thumbTouchSize={{ width: 25, height: 25 }}
                        step={0.5}
                    />
                </View>
            </View>

        );
    };

    initValues(){
        let data = [null, null, null, null, null, null, null, null];
        let steps = this.state.steps;
        for (let i = 0; i < steps.length; i++) 
            if (steps[i]) 
                data[i] = 0;
        
        this.setState({values: data})        
    };
    createAnalyze() {
        let data = this.state.values;
        let points = {};
        for (let i = 0; i < data.length; i++) {
            if (data[i] !== null) {
                points[Define.codeSteps[i]] = data[i];
            }

        }
        this.callRequest(points);
    };



    callRequest(points) {

        api.post('/createAnalyze', {

            _ApplicationId: Define.appId,
            _SessionToken: this.state.sessionToken,
            fundamentId: Define.fundamentId,
            playerId: this.state.playerId,
            points: points,
            commentText: this.state.commentText,
            commentAudio: this.state.commentAudio,

        }).then((res) => {
         AsyncStorage.multiSet([
                ['@CoachZac:configPlayer', JSON.stringify({ hasChangePlayer: true })],
                ['@CoachZac:configAnalyze', JSON.stringify({ hasChangeAnalyze: true })]
        ]);
           
        this.props.navigation.navigate("NewAnalyze", { points: points, playerName:  this.props.navigation.state.params.playerName})
        }).catch((e) => {
            //alert("Erro");
            alert(JSON.stringify(e.response.data.error));
        });
    };

    render() {
        return (

            <Container>
                <Header style={{ backgroundColor: 'white' }}>

                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-left" size={22.5} color='#269cda' />
                    </Button>

                    <Body style={{ paddingLeft: '5%' }}>
                        <Title style={{ color: '#269cda' }}>Criando Avaliação</Title>
                        <Text style={{ fontSize: 10, color: '#269cda' }}>Avalie os passos selecionados </Text>
                    </Body>

                    <Button transparent onPress={() => this.props.navigation.navigate("Home", { page: 3 })}>
                        <Icon name="home" size={22.5} color='#E07A2F' />
                    </Button>

                </Header>

                <Content padder>

                    {this.state.steps[0] ? this.renderSliders(0) : null}
                    {this.state.steps[1] ? this.renderSliders(1) : null}
                    {this.state.steps[2] ? this.renderSliders(2) : null}
                    {this.state.steps[3] ? this.renderSliders(3) : null}
                    {this.state.steps[4] ? this.renderSliders(4) : null}
                    {this.state.steps[5] ? this.renderSliders(5) : null}
                    {this.state.steps[6] ? this.renderSliders(6) : null}
                    {this.state.steps[7] ? this.renderSliders(7) : null}

                    {this.state.showComments ?
                        <Form style={{ padding: '5%' }}>
                            <Textarea rowSpan={5} bordered placeholder="Comentários" style={{ borderColor: '#269cda' }} />
                        </Form>
                        : null
                    }

                </Content>
                <Button block style={{ backgroundColor: '#269cda' }} onPress={() => this.createAnalyze()}>
                    <Text>SALVAR AVALIAÇÃO</Text>
                </Button>
            </Container >

        );
    }
}

const styles = StyleSheet.create({

    textAreaContainer: {
        borderColor: "gray",
        borderWidth: 1,
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    },
    step: {
        fontSize: 16,
        color: 'gray'
    }
});
