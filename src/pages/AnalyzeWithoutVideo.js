import React, { Component } from 'react';
import { Slider, ListView, View, StyleSheet, TouchableOpacity, Platform, TextInput, ScrollView, Alert, AsyncStorage } from 'react-native';
import { Container, Textarea, Form, Item, Thumbnail, Header, Content, CheckBox, Button, List, ListItem, Text, Left, Body, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../services/api';
import { NavigationActions, StackActions } from 'react-navigation';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { Overlay } from 'react-native-elements';
import Sound from 'react-native-sound';

const Define = require('../config/Define.js');

const Parse = require('parse/react-native');
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(Define.appId);
Parse.serverURL = Define.baseURL;


const resetActionHome = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

const resetActionLogin = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

var sound = null;

export default class AnalyzeWithoutVideo extends Component {


    state = {
        playerId: "",
        steps: [],
        sessionToken: "",
        values: [],
        showComments: false,
        commentText: "",
        commentAudio: "",
        isVisible: false,
        status: "play",
        recordTime: 0,
        currentTime: 0.0,
        recording: false,
        paused: false,
        stoppedRecording: false,
        finished: false,
        audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
        hasPermission: undefined,
        base64: "",
        statusAudio: "play"

    };

    prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "High",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 32000,
            IncludeBase64: true
        });
    }

    async componentDidMount() {
        const sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));

        if (sessionToken) {
            this.setState({
                sessionToken: sessionToken,
                //playerId: this.props.navigation.state.params.playerId,
                //steps: this.props.navigation.state.params.steps,
            });

            //alert(this.props.navigation.state.params.values);

            this.initValues();
        }

        AudioRecorder.requestAuthorization().then((isAuthorised) => {
            this.setState({ hasPermission: isAuthorised });

            if (!isAuthorised) return;

            this.prepareRecordingPath(this.state.audioPath);

            AudioRecorder.onProgress = (data) => {
                this.setState({ currentTime: Math.floor(data.currentTime) });
            };

            AudioRecorder.onFinished = (data) => {

                this.setState({ base64: data.base64, status: 'finish' })
                //this.uploadAudio(data.base64);
                // Android callback comes in the form of a promise instead.
                if (Platform.OS === 'ios') {
                    this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
                }
            };
        });

    };

    async _stop() {
        if (!this.state.recording) {
            console.warn('Can\'t stop, not recording!');
            return;
        }

        this.setState({ stoppedRecording: true, recording: false, paused: false });

        try {
            const filePath = await AudioRecorder.stopRecording();

            if (Platform.OS === 'android') {
                this._finishRecording(true, filePath);
            }
            //alert(filePath);
            return filePath;
        } catch (error) {
            console.error(error);
        }
    };

    async _record() {
        if (this.state.recording) {
            console.warn('Already recording!');
            return;
        }

        if (!this.state.hasPermission) {
            console.warn('Can\'t record, no permission granted!');
            return;
        }

        if (this.state.stoppedRecording) {
            this.prepareRecordingPath(this.state.audioPath);
        }

        this.setState({ recording: true, paused: false });

        try {
            const filePath = await AudioRecorder.startRecording();
            //alert(filePath);
        } catch (error) {
            console.error(error);
        }
    };

    _finishRecording(didSucceed, filePath, fileSize) {
        this.setState({ finished: didSucceed });
        //alert(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
    };

    changeValues(pos, value) {
        let data = this.state.values;
        data[pos] = value;

        this.setState({ values: data, showComments: true });
    };

    renderSliders(pos) {
        return (
            <View style={{ paddingLeft: '10%', paddingTop: '3%' }}>
                <Text style={{ fontSize: 16, color: '#E07A2F' }}>
                    <Text style={{ fontSize: 14, color: '#696969' }}>{Define.nameSteps[pos] + ": "}</Text>
                    {this.state.values[pos]}
                </Text>
                <View style={{ paddingRight: '10%', paddingTop: '3%' }}>
                    <Slider
                        value={this.state.value}
                        onValueChange={value => this.changeValues(pos, value)}
                        minimumValue={0}
                        maximumValue={10}
                        maximumTrackTintColor={"#269cda"}
                        minimumTrackTintColor={'#269cda'}
                        thumbTintColor={"#C9F60A"}
                        thumbTouchSize={{ width: 50, height: 40 }}
                        step={0.5}
                    />
                </View>
            </View>

        );
    };
    initValues() {
        let data = [null, null, null, null, null, null, null, null];
        let steps = this.props.navigation.state.params.steps;
        for (let i = 0; i < steps.length; i++)
            if (steps[i])
                data[i] = 0;

        this.setState({ values: data })
    };
    uploadAudio = async (points) => {

        let parseFile = new Parse.File("sound.aac", { base64: this.state.base64 });
        const result = await parseFile.save();
        //resultado esta vindo alterado
        let temp = JSON.stringify(result).split('https');
        let url = temp[1];
        url = url.substr(0, (url.length - 2));
        this.setState({ commentAudio: 'https' + url });

        let Test = new Parse.Object.extend("Test");
        let test = new Test();
        test.set("uri", 'https' + url);
        test.save();

        this.callRequest(points);

    };
    createAnalyze() {
        let data = this.state.values;
        let points = {};
        for (let i = 0; i < data.length; i++) {
            if (data[i] !== null) {
                points[Define.codeSteps[i]] = data[i];
            }

        }
        if (this.state.status == "finish") {
            this.uploadAudio(points);
        }
        else
            this.callRequest(points);
    };
    callRequest(points) {

        //alert(this.props.navigation.state.params.playerId);

        api.post('/createAnalyze', {

            _ApplicationId: Define.appId,
            _SessionToken: this.state.sessionToken,
            fundamentId: Define.fundamentId,
            playerId: this.props.navigation.state.params.playerId,
            points: points,
            commentText: this.state.commentText,
            commentAudio: this.state.commentAudio,

        }).then((res) => {

            AsyncStorage.multiSet([
                ['@CoachZac:configPlayer', JSON.stringify({ hasChangePlayer: true })],
                ['@CoachZac:configAnalyze', JSON.stringify({ hasChangeAnalyze: true })]
            ]);

            const resetAnalyze = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({
                    routeName: 'NewAnalyze',
                    params: {
                        points: points,
                        playerName: this.props.navigation.state.params.playerName,
                        steps: this.props.navigation.state.params.steps,
                        playerId: this.props.navigation.state.params.playerId,
                        values: this.state.values,
                        commentText: this.state.commentText,
                        commentAudio: this.state.commentAudio,
                        analyzeId: res.data.result.objectId
                    }
                })],
            });

            alert("Avaliação salva com sucesso!");
            this.props.navigation.dispatch(resetAnalyze);


            //this.props.navigation.navigate("NewAnalyze", { points: points, playerName: this.props.navigation.state.params.playerName })
        }).catch((e) => {
            //alert("Erro");
            alert(JSON.stringify(e.response.data.error));
        });
    };
    tempRecorder() {
        this.setState({ status: "recorder" })
        this._record();
    };

    _playAudio() {


        this.setState({ statusAudio: "listen" })
        //alert(this.state.audioPath);
        sound = new Sound(this.state.audioPath, null, (error) => {
            if (error) {
                // do something
            }

            // play when loaded
            sound.play();

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
        if (sound)
            sound.stop();
    };

    render() {
        let { steps } = this.props.navigation.state.params;
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

                    <Button transparent onPress={() => this.props.navigation.dispatch(resetActionHome)}>
                        <Icon name="home" size={22.5} color='#E07A2F' />
                    </Button>

                </Header>

                <Content padder>

                    {steps[0] ? this.renderSliders(0) : null}
                    {steps[1] ? this.renderSliders(1) : null}
                    {steps[2] ? this.renderSliders(2) : null}
                    {steps[3] ? this.renderSliders(3) : null}
                    {steps[4] ? this.renderSliders(4) : null}
                    {steps[5] ? this.renderSliders(5) : null}
                    {steps[6] ? this.renderSliders(6) : null}
                    {steps[7] ? this.renderSliders(7) : null}


                    <View style={{ paddingTop: '5%', paddingLeft: '5%' }}>
                        <Text style={{ color: "#269cda" }}>Comentários: </Text>
                    </View>
                    <Form style={{ paddingLeft: '5%', paddingRight: "5%" }}>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Text style={{ fontSize: 10, color: 'gray' }}>0/255</Text>
                        </View>
                        <Textarea value={this.state.commentText} onKeyPress={(text) => this.setState({ commentText: text })} rowSpan={5} bordered placeholder="Texto" style={{ borderColor: '#269cda' }} />
                    </Form>
                    <View style={{ paddingTop: '5%', paddingLeft: '5%' }}>
                        <Text style={{ color: "#269cda" }}>Aúdio: </Text>
                    </View>
                    {this.state.status !== "finish"
                        ? <Item style={{ borderColor: 'white', paddingTop: '5%', paddingLeft: '5%', flexDirection: 'row' }}>



                            <Button transparent onPress={() => this.setState({ isVisible: true })}>
                                <View style={styles.CircleShapeView2}>
                                    <Icon name="microphone" size={30} color="white" />
                                </View>
                            </Button>


                        </Item>
                        : <Item style={{ borderColor: 'white', paddingTop: '5%', paddingLeft: '5%', flexDirection: 'row' }}>

                
                               
                                    {this.state.statusAudio === "play" ?

                                        <Button transparent onPress={() => this._playAudio()}>
                                            <View style={styles.CircleShapeView2}>
                                                <Icon name="play" size={30} color="white" />
                                            </View>
                                        </Button>
                                        : <Button transparent onPress={() => this._pauseAudio()}>
                                            <View style={styles.CircleShapeView2}>
                                                <Icon name="pause" size={30} color="white" />
                                            </View>
                                        </Button>
                                    }

                                    <Button style={{ paddingLeft: 10 }} transparent onPress={() => this.setState({ status: "play", currentTime: 0.0, base64: "", commentsAudio: "" })}>
                                        <View style={styles.CircleShapeView}>
                                            <Icon name="delete" size={30} color="white" />
                                        </View>
                                    </Button>
                                


                            
                            <Right style={{ borderBottomColor: '#E07A2F' }}>
                                {/* <TouchableOpacity onPress={() => this.setState({ status: "play", currentTime: 0.0, base64: "", commentsAudio: "" })}>
                                    <Text style={{ fontSize: 12, color: '#E07A2F' }}> Limpar </Text>
                                </TouchableOpacity> */}
                            </Right>
                        </Item>
                    }


                </Content>
                <View style={{ padding: '5%' }}>
                    <Button block style={{ backgroundColor: '#269cda' }} onPress={() => this.createAnalyze()}>
                        <Text>SALVAR AVALIAÇÃO</Text>
                    </Button>
                </View>

                <Overlay
                    isVisible={this.state.isVisible}

                    width={250}
                    height={260}
                    onBackdropPress={() => this.setState({ isVisible: false, status: "play", currentTime: 0.0 })}
                //containerStyle={{justifyContent:'center'}}
                >
                    <View style={{ paddingTop: '5%', alignItems: 'center', justifyContent: 'center' }}>
                        {this.state.currentTime == 0.0
                            ? <Text style={{ color: "#269cda" }}>00</Text>
                            : <Text style={{ color: "#269cda" }}>{this.state.currentTime}s</Text>
                        }
                    </View>
                    <View style={{ paddingTop: '15%', paddingBottom: '15%', alignItems: 'center', justifyContent: 'center' }}>

                        {this.state.status === "play"
                            ? <TouchableOpacity onPress={() => this.tempRecorder()}>
                                <View style={{ borderRadius: 50 }}>
                                    <Icon name="microphone" size={80} color='#269cda' />
                                </View>
                            </TouchableOpacity>
                            : <TouchableOpacity onPress={() => this._stop()}>
                                <View style={{ borderRadius: 50 }}>
                                    <Icon name="stop" size={80} color='red' />
                                </View>
                            </TouchableOpacity>
                        }
                    </View>

                    <View style={{ padding: '5%' }}>
                        {this.state.status === 'finish'
                            ? <Button onPress={() => this.setState({ isVisible: false })} block style={{ backgroundColor: '#269cda' }} >
                                <Text style={{ color: 'white' }}>Salvar</Text>
                            </Button>
                            : <Button disabled block bordered transparent style={{ borderColor: 'gray' }} >
                                <Text style={{ color: 'gray' }}>Salvar</Text>
                            </Button>
                        }

                    </View>

                </Overlay>
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
    },
    CircleShapeView: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#E07A2F',
        borderColor: 'white',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
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

    CircleShapeView3: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: 'gray',
        borderColor: 'white',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

