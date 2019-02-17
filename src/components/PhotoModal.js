import React, { Component } from 'react';
import { Item, Text, Button, Left, Right } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import { Modal, View, StyleSheet, TouchableOpacity, Alert, AsyncStorage, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.8)',
        alignItems: 'center',
        paddingTop: '20%',
        paddingRight: '10%',
        paddingLeft: '10%'
    },
    boxContainer: {
        backgroundColor: 'transparent',
    },
    textModal: {
        color: '#269cda'
    }
});

export default class PhotoModal extends Component {

    state = {
        player: [],
        user: [],
        photo: "",
        error: null,
        sessionToken: ""
    }

    async componentDidMount() {
    };

    componentWillUnmount() {
        this.props.onClose();
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
                        <Item style={{justifyContent: 'flex-end'}}>
                            <Right>
                                <Button transparent onPress={this.props.onClose}>
                                    <Icon name="close-box" size={30} style={{ color: '#269cda' }} />
                                </Button>
                            </Right>
                        </Item>
                        <Image
                            source={{ uri: this.props.uri }}
                            style={{ width: 250, height: 250 }}
                        />
                    </View>
                </View>

            </Modal>

        );
    }
}

