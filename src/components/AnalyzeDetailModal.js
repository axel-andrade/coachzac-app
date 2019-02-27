import React, { Component } from 'react';
import { Item, Text, Button, Left, Right } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import { Modal, View, StyleSheet, TouchableOpacity, Alert, AsyncStorage,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Define = require('../config/Define.js');

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
        alignItems: 'flex-start',
        paddingLeft: '5%'

    },
    textModal: {
        color: '#269cda'
    }
});

export default class AnalyzeDetailModal extends Component {

    state = {
    }

    async componentDidMount() {

    };

    componentWillUnmount() {

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

                        <Item style={{borderColor: '#269cda' }}>
                            <Text style={{ color: '#269cda', fontWeight: 'bold' }}>Detalhes</Text>
                            <Right style={{padding:5}}>
                                <Button transparent onPress={this.props.onClose}>
                                    <Icon name="close-box" size={30} style={{ color: '#E07A2F' }} />
                                </Button>
                            </Right>

                        </Item>

                        <View style={{ paddingTop: '5%', paddingBottom: '5%' }}>
                            <Text note style={{ fontSize: 14, color: '#E07A2F' }}>{"Informações: "}</Text>
                        </View>
                        <Text note style={{ fontSize: 14, color: "#269cda" }}>
                            <Text note style={{ fontSize: 14, color: '#696969' }}>{"Atleta: "}</Text>
                            {this.props.playerName}
                        </Text>
                        <Text note style={{ fontSize: 14, color: "#269cda" }}>
                            <Text note style={{ fontSize: 14, color: '#696969' }}>{"Fundamento: "}</Text>
                            Saque
                        </Text>


                        <View style={{ paddingTop: '5%', paddingBottom: '5%' }}>
                            <Text note style={{ fontSize: 14, color: '#E07A2F' }}>{"Notas: "}</Text>
                        </View>
                        <View style={{ paddingBottom: '5%' }}>
                            {this.props.list}
                        </View>



                    </View>
                </View>

            </Modal>

        );
    }
}

