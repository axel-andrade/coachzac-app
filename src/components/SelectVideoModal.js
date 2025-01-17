import React, { Component } from 'react';
import { Item, Text, Button, Left, Right } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import { Modal, View, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api';
import { Slider } from 'react-native-elements';
const Define = require('../config/Define.js');

//Funções do Parse
const Parse = require('parse/react-native');
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('coachzacId');
Parse.serverURL = Define.baseURL;


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.5)',
        alignItems: 'center',
        paddingTop: '20%',
        paddingRight: '10%',
        paddingLeft: '10%'
    },
    boxContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#269cda',
        alignItems: 'center',

    },
    textModal: {
        color: '#269cda'
    }
});

export default class SelectVideoModal extends Component {

    goAnalyzeWithouVideo(){

        this.props.onClose();
        //this.props.restartSteps();
        //alert(this.props.steps)
        this.props.navigation.navigate("AnalyzeWithoutVideo", {steps: this.props.steps, playerId: this.props.playerId, playerName: this.props.playerName});

    };

    render() {

        return (

            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => { }}
            >
                <View style={styles.modalContainer} onPress={this.props.onClose}>

                    <View style={styles.boxContainer}>
                        <Item style={{ padding: 10, borderColor: '#269cda' }}>
                            <Text style={{ color: '#269cda', fontWeight: 'bold' }}>Selecione um vídeo</Text>
                            <Right>
                                <Button transparent onPress={this.props.onClose}>
                                    <Icon name="close-box" size={30} style={{ color: '#E07A2F' }} />
                                </Button>
                            </Right>

                        </Item>

                        <Item  onPress={()=> alert("Galeria")}style={{ padding: 10, borderColor: '#F1F9FF' }} >
                            <Left>
                                    <Icon name="file-multiple" size={24} style={styles.textModal} />

                            </Left>
                                <Text style={styles.textModal}>Abrir galeria</Text>
                        
                            <Right>

                            </Right>
                        </Item>
                        <Item onPress={()=> alert("Câmera")} style={{ padding: 10, borderColor: '#F1F9FF' }}>
                            <Left>
                                    <Icon name="camera" size={26} style={styles.textModal} />
                            </Left>
                                <Text style={styles.textModal}>Abrir câmera</Text>
                            <Right></Right>
                        </Item>

                        <Item onPress={()=> this.goAnalyzeWithouVideo()} style={{ padding: 10, borderColor: '#F1F9FF' }} >
                            <Left>
                                <TouchableOpacity onPress={()=> this.goAnalyzeWithouVideo()}>
                                    <Icon name="video-off" size={30} style={styles.textModal} />
                                </TouchableOpacity>
                            </Left>
                            <TouchableOpacity onPress={()=> this.goAnalyzeWithouVideo()}>
                                <Text style={styles.textModal}>Sem vídeo</Text>
                            </TouchableOpacity>
                            <Right>

                            </Right>
                        </Item>

                    </View>
                </View>

            </Modal>

        );
    }
}

