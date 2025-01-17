import React, { Component } from 'react';
import { ListView, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, AsyncStorage } from 'react-native';
import { Container, Textarea, Form, Item, Thumbnail, Header, Content, CheckBox, Button, List, ListItem, Text, Left, Body, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Slider } from 'react-native-elements';
const Define = require('../config/Define.js');
import api from '../services/api';
import { NavigationActions, StackActions } from 'react-navigation';
import { Overlay } from 'react-native-elements';

import Sound from 'react-native-sound';

var sound = null;
const codes = ["foot-position","initial-arm","right-before","ball-elevation","ball-height","left-extended","foot-movement","knee-flexion"];
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home', params: { page: 2} })],
});

export default class AnalyzeWithoutVideo extends Component {


    state = {
        analyze: [],
        values: [],
        sessionToken: "",
        average: 0,
        codes: [],
        points: {},
        showButtons: false,
        modalVisible: false,
        listFields: [],
        statusAudio: "play"
    };

    async componentDidMount() {
        const sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));
        //this.props.navigation.state.params.playerId
        if (sessionToken) {
            this.setState({
                 sessionToken: sessionToken,
                 points: this.props.navigation.state.params.analyze.points,
                 //average: parseFloat(this.props.navigation.state.params.analyze.average).toFixed(1),

            });
            this.calculateCodes(this.props.navigation.state.params.analyze.points);
        }

        this.renderInfo();
        this.initValues();

    };

    calculateCodes(points) {
        let data = [];
     
        for (let i in points) {
            data.push(i)
        }
       
        this.setState({codes: data})
    
    };

    setValues(points) {
        alert(points)
    };

    renderInfo() {
        let temp = [];
        this.state.codes.map((data, index) => {
            temp.push(
                <Text note style={{ fontSize: 14, color: "#E07A2F" }}>
                    <Text note style={{ fontSize: 14, color: 'black' }}>{Define.nameSteps[Define.codeSteps.indexOf(data)] + ": "}</Text>
                    {this.state.points[data]}
                </Text>
            )
        });

        this.setState({ listFields: temp })

    };

    editAnalyze() {
        this.props.navigation.navigate("UpdateAnalyzeForList", {
            player: this.props.navigation.state.params.analyze.player,
            steps: this.state.steps,
            playerName: this.props.navigation.state.params.analyze.player.name,
            playerId: this.props.navigation.state.params.analyze.player.objectId,
            values: this.state.values,
            commentText: this.props.navigation.state.params.analyze.commentText,
            commentAudio: this.props.navigation.state.params.analyze.commentAudio,
            analyzeId: this.props.navigation.state.params.analyze.objectId

        })
    };

    _playAudio() {


        this.setState({ statusAudio: "listen" })
        //alert(this.state.audioPath);
        sound = new Sound(this.props.navigation.state.params.analyze.commentAudio, null, (error) => {
            if (error) {
                // do something
            }

            // play when loaded
            sound.play((success) => {
                this.setState({ statusAudio: "play" });
            });

        });


    };

    _pauseAudio() {
        if (sound !== null) {
            // this.setState({ statusAudio: "play" })
            // sound.pause();
            alert(sound.getCurrentTime())
        } else alert("sound null")
    }

    _stopAudio() {
        this.setState({ statusAudio: "play" })
        if (sound) {
            sound.stop();
            sound.setVolume(0.0);

        }
    };
    
    exitOverlay(){
        this.setState({ modalVisible: false});
        this._stopAudio();
    }

    createSteps(){
        let steps = [false,false,false,false,false,false,false,false];
        
        let {points} = this.props.navigation.state.params.analyze;

        for(let i=0;i<codes.length;i++)
            if(points[codes[i]]>=0)
                steps[i] = true; 

        return steps;
    }

    initValues() {
        let data = [null, null, null, null, null, null, null, null];
        let steps = this.createSteps();
        let {points} = this.props.navigation.state.params.analyze;
        for (let i = 0; i < steps.length; i++)
            if (steps[i])
                data[i] = points[codes[i]];

        this.setState({ values: data, steps: steps })
    };

    render() {
        
        let { commentAudio, commentText } = this.props.navigation.state.params.analyze;
        return (

            <Container>
                <Header style={{ backgroundColor: 'white', justifyContent:'center'}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.dispatch(resetAction)}>
                            <Icon name="arrow-left" size={22.5} color='#269cda' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color:'#269cda'}}>Resultado</Title>
                    </Body>
                    <Right></Right>
                    
                </Header>

                <Content padder>



                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '10%' }}>
                        <View style={styles.CircleShapeView}>
                            <Text style={{ color: '#E07A2F', fontWeight: 'bold', fontSize: 48 }}>{parseFloat(this.props.navigation.state.params.analyze.average).toFixed(1)} </Text>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '15%' }}>
                        <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
                            <View style={{ borderBottomColor: '#E07A2F', borderBottomWidth: 0.5 }}>
                                <Text style={{ color: '#E07A2F', fontSize: 14 }}>Ver Detalhes</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingTop: "10%" }}>
                        <View style={{ padding: '5%' }}>
                            <Button block style={{ backgroundColor: '#269cda' }} onPress={() => this.props.navigation.navigate("PlayerForAnalyze")}>
                                <Text>NOVA AVALIAÇÃO</Text>
                            </Button>
                        </View>
                        <View style={{ paddingLeft: '5%', paddingRight: '5%' }} >
                            <Button block style={{ backgroundColor: '#269cda' }} onPress={() => this.editAnalyze()}>
                                <Text>EDITAR AVALIAÇÃO</Text>
                            </Button>
                        </View>
                    </View>
                        

                </Content>

                <Overlay
                    isVisible={this.state.modalVisible}

                    width='auto'
                    height='auto'
                    onBackdropPress={() => this.exitOverlay()}
                //containerStyle={{justifyContent:'center'}}
                >
                    <View style={{ padding: '2%' }}>
                        <View style={{ paddingBottom: '5%' }}>
                            <Text note style={{ fontSize: 14, color: '#269cda' }}>{"Informações: "}</Text>
                        </View>
                        <Text note style={{ fontSize: 14, color: "#E07A2F" }}>
                            <Text note style={{ fontSize: 14, color: 'black' }}>{"Atleta: "}</Text>
                            {this.props.navigation.state.params.analyze.player.name}
                        </Text>
                        <Text note style={{ fontSize: 14, color: "#E07A2F" }}>
                            <Text note style={{ fontSize: 14, color: 'black' }}>{"Fundamento: "}</Text>
                            Saque
                        </Text>


                        <View style={{ paddingTop: '5%', paddingBottom: '5%' }}>
                            <Text note style={{ fontSize: 14, color: '#269cda' }}>{"Notas: "}</Text>
                        </View>
                        <View style={{ paddingBottom: '5%' }}>
                            {this.state.listFields}
                        </View>

                        {
                            commentText || commentAudio
                                ? <View style={{ paddingBottom: '5%' }}>
                                    <Text note style={{ fontSize: 14, color: '#269cda' }}>{"Comentários: "}</Text>
                                </View>
                                : null

                        }

                        {
                            commentText ?
                                <View style={{ paddingBottom: '5%' }}>
                                    <Textarea editable={false} value={commentText} rowSpan={5} bordered style={{ borderColor: '#269cda', color: "#555555" }} />
                                </View>
                                : null
                        }

                        {
                            commentAudio
                                ? this.state.statusAudio === "play" ?

                                    <Button transparent onPress={() => this._playAudio()}>
                                        <View style={styles.CircleShapeView2}>
                                            <Icon name="play" size={30} color="white" />
                                        </View>
                                    </Button>
                                    : <Button transparent onPress={() => this._stopAudio()}>
                                        <View style={styles.CircleShapeView2}>
                                            <Icon name="stop" size={30} color="white" />
                                        </View>
                                    </Button>
                                : null
                        }


                    </View>




                </Overlay>

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
    CircleShapeView2: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#269cda',
        borderColor: 'white',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
