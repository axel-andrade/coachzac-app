import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Platform,
    PermissionsAndroid,
    AsyncStorage
} from 'react-native';

import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { Right } from 'native-base';

const Parse = require('parse/react-native');
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('coachzacId');
Parse.serverURL = 'https://coachzac-v2-api.herokuapp.com/use';

export default class RecorderAudio extends Component {

    state = {
        currentTime: 0.0,
        recording: false,
        paused: false,
        stoppedRecording: false,
        finished: false,
        audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
        hasPermission: undefined,
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

    componentDidMount() {
        AudioRecorder.requestAuthorization().then((isAuthorised) => {
            this.setState({ hasPermission: isAuthorised });

            if (!isAuthorised) return;

            this.prepareRecordingPath(this.state.audioPath);

            AudioRecorder.onProgress = (data) => {
                this.setState({ currentTime: Math.floor(data.currentTime) });
            };

            AudioRecorder.onFinished = (data) => {
                let response = JSON.stringify(data);
                this.uploadAudio(data.base64);
                // Android callback comes in the form of a promise instead.
                if (Platform.OS === 'ios') {
                    this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
                }
            };
        });
    }

    _renderButton(title, onPress, active) {
        var style = (active) ? styles.activeButtonText : styles.buttonText;

        return (
            <TouchableHighlight style={styles.button} onPress={onPress}>
                <Text style={style}>
                    {title}
                </Text>
            </TouchableHighlight>
        );
    }

    _renderPauseButton(onPress, active) {
        var style = (active) ? styles.activeButtonText : styles.buttonText;
        var title = this.state.paused ? "RESUME" : "PAUSE";
        return (
            <TouchableHighlight style={styles.button} onPress={onPress}>
                <Text style={style}>
                    {title}
                </Text>
            </TouchableHighlight>
        );
    }

    async _pause() {
        if (!this.state.recording) {
            console.warn('Can\'t pause, not recording!');
            return;
        }

        try {
            const filePath = await AudioRecorder.pauseRecording();
            this.setState({ paused: true });
        } catch (error) {
            console.error(error);
        }
    }

    async _resume() {
        if (!this.state.paused) {
            console.warn('Can\'t resume, not paused!');
            return;
        }

        try {
            await AudioRecorder.resumeRecording();
            this.setState({ paused: false });
        } catch (error) {
            console.error(error);
        }
    }

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
            alert(filePath);
            return filePath;
        } catch (error) {
            console.error(error);
        }
    }

    async _play() {
        if (this.state.recording) {
            await this._stop();
        }

        // These timeouts are a hacky workaround for some issues with react-native-sound.
        // See https://github.com/zmxv/react-native-sound/issues/89.
        setTimeout(() => {
            var sound = new Sound(this.state.audioPath, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                }
            });

            setTimeout(() => {
                sound.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }, 100);
        }, 100);
    }

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
            alert(filePath);
        } catch (error) {
            console.error(error);
        }
    }

    _finishRecording(didSucceed, filePath, fileSize) {
        this.setState({ finished: didSucceed });
        alert(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
    };

    uploadAudio = async (base64) => {

        alert(base64);
        // let base64 = new Buffer("file:///sdcard/sound.mp4").toString("base64");

        // alert(base64);

        let parseFile = new Parse.File("sound.aac", { base64: base64 });
        const result = await parseFile.save();
        //resultado esta vindo alterado
         let temp = JSON.stringify(result).split('https');
         let url = temp[1];
         url = url.substr(0, (url.length - 2));
        // this.setState({ photo: 'https' + url });

        let Test = new Parse.Object.extend("Test");
        let test = new Test();
        test.set("uri",'https' + url );
        test.save();

        alert(url);

    };



    render() {

        return (
            <View style={styles.container}>
                <View style={styles.controls}>
                    {this._renderButton("RECORD", () => { this._record() }, this.state.recording)}
                    {this._renderButton("PLAY", () => { this._play() })}
                    {this._renderButton("STOP", () => { this._stop() })}
                    {this._renderButton("UPLOAD", () => { this.uploadAudio() })}
                    {/* {this._renderButton("PAUSE", () => {this._pause()} )} */}
                    {this._renderPauseButton(() => { this.state.paused ? this._resume() : this._pause() })}
                    <Text style={styles.progressText}>{this.state.currentTime}s</Text>
                </View>


            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2b608a",
    },
    controls: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    progressText: {
        paddingTop: 50,
        fontSize: 50,
        color: "#fff"
    },
    button: {
        padding: 20
    },
    disabledButtonText: {
        color: '#eee'
    },
    buttonText: {
        fontSize: 20,
        color: "#fff"
    },
    activeButtonText: {
        fontSize: 20,
        color: "#B81F00"
    }

});




// import React, { Component } from 'react';
// import { Text, View, AsyncStorage, Alert, ActivityIndicator, StyleSheet, Platform,TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Container, Header, Item, Input, Content, Button, Left, Right, Body } from 'native-base';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// import { Overlay } from 'react-native-elements';
// import { Buffer } from 'buffer'

// const audioRecorderPlayer = new AudioRecorderPlayer();

// const Parse = require('parse/react-native');
// Parse.setAsyncStorage(AsyncStorage);
// Parse.initialize('coachzacId');
// Parse.serverURL = 'https://coachzac-v2-api.herokuapp.com/use';


// export default class RecorderAudio extends Component {

//     state = {
//         recordSecs: 0,
//         recordTime: 0,
//         isVisible: false,
//         status: "play",
//         currentPositionSec: 0,
//         currentDurationSec: 0,
//         playTime: 0,
//         duration: 0,
//     };

//     uploadAudio = async () => {


//           const uri = await audioRecorderPlayer.startRecord('sdcard/sound.mp4');
//         alert("URI",uri);
//         // let base64 = new Buffer("file:///sdcard/sound.mp4").toString("base64");

//         // alert(base64);

//         // let parseFile = new Parse.File("sound.mp4", { base64: base64 });
//         // const result = await parseFile.save();
//         // //resultado esta vindo alterado
//         //  let temp = JSON.stringify(result).split('https');
//         //  let url = temp[1];
//         //  url = url.substr(0, (url.length - 2));
//         // // this.setState({ photo: 'https' + url });

//         // let Test = new Parse.Object.extend("Test");
//         // let test = new Test();
//         // test.set("uri",'https' + url );
//         // test.save();

//         // alert(url);

//     };

//     onStartRecord = async () => {

//         const result = await audioRecorderPlayer.startRecorder();
//         audioRecorderPlayer.addRecordBackListener((e) => {
//             this.setState({
//                 recordSecs: e.current_position,
//                 recordTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
//             });
//             return;
//         });
//         alert(result);
//     }

//     onStopRecord = async () => {
//         const result = await audioRecorderPlayer.stopRecorder();
//         audioRecorderPlayer.removeRecordBackListener();
//         this.setState({
//             recordSecs: 0,
//         });
//         alert(result);
//     }

//     onStartPlay = async () => {
//         alert('onStartPlay');
//         const msg = await audioRecorderPlayer.startPlayer();
//         alert(msg);
//         audioRecorderPlayer.addPlayBackListener((e) => {
//             if (e.current_position === e.duration) {
//                 alert('finished');
//                 audioRecorderPlayer.stopPlayer();
//             }
//             this.setState({
//                 currentPositionSec: e.current_position,
//                 currentDurationSec: e.duration,
//                 playTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
//                 duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
//             });
//             return;
//         });
//     }



//     onPausePlay = async () => {
//         await audioRecorderPlayer.pausePlayer();
//     }

//     onStopPlay = async () => {
//         alert('onStopPlay');
//         audioRecorderPlayer.stopPlayer();
//         audioRecorderPlayer.removePlayBackListener();
//     }


//     recorder() {
//         this.setState({ status: "recorder" });
//         this.onStartRecord();
//     }
//     stopRecorder() {
//         this.setState({ status: "finish" });
//         this.onStopRecord();
//     }
//     render() {


//         return (


//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

//                 <Text>{this.state.recordTime + ":" + this.state.recordSecs}</Text>
//                 <View style={{ flexDirection: 'row' }}>
//                     <View style={{ padding: '10%' }}>
//                         <Button block onPress={() => this.onStartRecord()}>
//                             <Text>Gravar</Text>
//                         </Button>
//                     </View>
//                     <View style={{ padding: '10%' }}>
//                         <Button block onPress={() => this.onStopRecord()}>
//                             <Text>Parar</Text>
//                         </Button>
//                     </View>
//                 </View>

//                 <View style={{ flexDirection: 'row' }}>
//                     <View style={{ padding: '10%' }}>
//                         <Button block onPress={() => this.onStartPlay()}>
//                             <Text>Play</Text>
//                         </Button>
//                     </View>
//                     <View style={{ padding: '10%' }}>
//                         <Button block onPress={() => this.onPausePlay()}>
//                             <Text>Pause</Text>
//                         </Button>
//                     </View>
//                     <View style={{ padding: '10%' }}>
//                         <Button block onPress={() => this.onStopPlay()}>
//                             <Text>Stop</Text>
//                         </Button>
//                     </View>
//                 </View>
//                 <Button block onPress={() => this.setState({ isVisible: true })}>
//                     <Text>Overlay</Text>
//                 </Button>


//             <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '10%' }}>
//                 <TouchableOpacity onPress={async () => await audioRecorderPlayer.startPlayer("https://drive.google.com/file/d/1pAAsQdTFvyUiKQGxePvd5QdXnJLw95mE/view?usp=sharing")}>
//                     <View style={styles.CircleShapeView}>
//                         <Icon name="play" size={30} color='white' />
//                     </View>
//                 </TouchableOpacity>
//             </View>
//             <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '10%' }}>
//                 <TouchableOpacity onPress={() => this.onPausePlay()}>
//                     <View style={styles.CircleShapeView}>
//                         <Icon name="pause" size={30} color='white' />
//                     </View>
//                 </TouchableOpacity>
//             </View>

//             <Button onPress={()=> this.uploadAudio()}>
//                 <Text>Upload</Text>
//             </Button>




//             <Overlay
//                 isVisible={this.state.isVisible}

//                 width={250}
//                 height={260}
//                 onBackdropPress={() => this.setState({ isVisible: false, status: "play", recordTime: 0 })}
//             //containerStyle={{justifyContent:'center'}}
//             >
//                 <View style={{ paddingTop: '5%', alignItems: 'center', justifyContent: 'center' }}>
//                     {this.state.recordTime == 0
//                         ? <Text style={{ color: "#269cda" }}>00:00:00</Text>
//                         : <Text style={{ color: "#269cda" }}>{this.state.recordTime}</Text>
//                     }
//                 </View>
//                 <View style={{ paddingTop: '15%', paddingBottom: '15%', alignItems: 'center', justifyContent: 'center' }}>

//                     {this.state.status === "play"
//                         ? <TouchableOpacity onPress={() => this.recorder()}>
//                             <View style={{ borderRadius: 50 }}>
//                                 <Icon name="microphone" size={80} color='#269cda' />
//                             </View>
//                         </TouchableOpacity>
//                         : <TouchableOpacity onPress={() => this.stopRecorder()}>
//                             <View style={{ borderRadius: 50 }}>
//                                 <Icon name="stop" size={80} color='red' />
//                             </View>
//                         </TouchableOpacity>
//                     }
//                 </View>

//                 <View style={{ padding: '5%' }}>
//                     {this.state.status === 'finish'
//                         ? <Button onPress={() => this.setState({ isVisible: false, status: "play", recordTime: 0 })} block style={{ backgroundColor: '#269cda' }} >
//                             <Text style={{ color: 'white' }}>Salvar</Text>
//                         </Button>
//                         : <Button disabled block bordered transparent style={{ borderColor: 'gray' }} >
//                             <Text style={{ color: 'gray' }}>Salvar</Text>
//                         </Button>
//                     }

//                 </View>

//             </Overlay>




//             </View >

//         );
//     }
// }

// const styles = StyleSheet.create({
//     CircleShapeView: {
//         width: 60,
//         height: 60,
//         borderRadius: 60 / 2,
//         backgroundColor: '#269cda',
//         borderColor: 'white',
//         borderWidth: 0.5,
//         justifyContent: 'center',
//         alignItems: 'center',

//     },

//     // OvalShapeView: {
//     //   marginTop: 20,
//     //   width: 100,
//     //   height: 100,
//     //   backgroundColor: '#00BCD4',
//     //   borderRadius: 50,
//     //   transform: [
//     //     {scaleX: 2}
//     //   ]
//     // },
// });

