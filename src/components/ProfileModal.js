import React, { Component } from 'react';
import { Item, Text, Button, Left, Right } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import { Modal, View, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api';
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

export default class ProfileModal extends Component {

    state = {
        player: [],
        user: [],
        photo: "",
        error: null,
        sessionToken: ""
    }

    async componentDidMount() {
        //1 - foto do treinador 2 foto no cadastro do atleta 3 atualizacao de foto no perfil do atleta
        if (this.props.typeUser == 1) {
            const user = JSON.parse(await AsyncStorage.getItem('@CoachZac:user'));

            if (user)
                this.setState({ user: user });
            else
                this.setState({ error: true });
        }

        if (this.props.typeUser == 3) {
            this.setState({ player: this.props.player });
        }

        const sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));
        if (sessionToken != null)
            this.setState({ sessionToken: sessionToken });

    };

    handlePhotoLibrary = async () => {

        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            cropperCircleOverlay: true,
            compressImageQuality: 1,
            includeBase64: true,
        }).then(response => {
            this.props.onClose();

            //se e pra o treinador ja cadastrado 
            if (this.props.typeUser == 1 || this.props.typeUser == 3) {
                this.uploadPhoto(response);
            }
            //cadastrando novo atleta
            if (this.props.typeUser == 2) {
                AsyncStorage.setItem('@CoachZac:photoPlayer', JSON.stringify(response));
                this.props.onSave();
            }
        }, error => {
            this.props.onClose();
        });

    };

    handlePhotoCamera = () => {

        ImagePicker.openCamera({
            width: 500,
            height: 500,
            cropping: true,
            cropperCircleOverlay: true,
            compressImageQuality: 1,
            includeBase64: true,
        }).then(response => {
            this.props.onClose();

            //se e pra o treinador ja cadastrado 
            if (this.props.typeUser == 1 || this.props.typeUser == 3) {
                this.uploadPhoto(response);
            }
            //cadastrando novo atleta
            if (this.props.typeUser == 2) {
                AsyncStorage.setItem('@CoachZac:photoPlayer', JSON.stringify(response));
                this.props.onSave();
            }
        }, error => {
            this.props.onClose();
        });

    };
    uploadPhoto = async (response) => {

        let parseFile = new Parse.File("profile.jpg", { base64: response.data });
        const result = await parseFile.save();
        //resultado esta vindo alterado
        let temp = JSON.stringify(result).split('https');
        let url = temp[1];
        url = url.substr(0, (url.length - 2));
        this.setState({ photo: 'https' + url });
        //Alert.alert(url);
        if (this.props.typeUser == 1)
            this.updateUser();
        if (this.props.typeUser == 3)
            this.updatePlayer();
    };

    //"playerId", "name", "email", "dateOfBirth", "weight", "height", "adress", "phone"
    updateUser = async () => {

        api.post('/updateUser', {
            _ApplicationId: 'coachzacId',
            _SessionToken: this.state.sessionToken,
            profileImage: this.state.photo

        }).then((res) => {
            const user = res.data.result;
            AsyncStorage.multiSet([
                ['@CoachZac:user', JSON.stringify(user)],
            ]);
            this.props.onRefresh();
        }).catch((e) => {
            this.setState({ error: true });
        });
    };

    updatePlayer = async () => {

        
        api.post('/updatePlayer', {

            _ApplicationId: 'coachzacId',
            _SessionToken: this.state.sessionToken,
            playerId: this.state.player.objectId,
            profileImage: this.state.photo

        }).then((res) => {
            let player = res.data.result;
            AsyncStorage.multiSet([
                ['@CoachZac:player', JSON.stringify(player)],
                ['@CoachZac:configPlayer', JSON.stringify({ hasChangePlayer: true })]
            ]);
            this.props.onClose();
            this.props.onCreated(player.profileImage);
            Alert.alert("Foto alterada com sucesso!");
        }).catch((e) => {
        });

    };

    deleteUserProfileImage = async () => {

        api.post('/deleteUserProfileImage', {

            _ApplicationId: 'coachzacId',
            _SessionToken: this.state.sessionToken

        }).then((res) => {
            const user = res.data.result;
            AsyncStorage.multiSet([
                ['@CoachZac:user', JSON.stringify(user)],
            ]);
            this.props.onClose();
            this.props.onRefresh();
            Alert.alert("Foto removida com sucesso!");
        }).catch((e) => {
            Alert.alert("Erro");
            //Alert.alert(JSON.stringify(e.response.data.error));
        });
    };

    deletePlayerProfileImage = async () => {

        api.post('/deletePlayerProfileImage', {

            _ApplicationId: 'coachzacId',
            _SessionToken: this.state.sessionToken,
            playerId: this.state.player.objectId

        }).then((res) => {

            const player = res.data.result;
            AsyncStorage.multiSet([
                ['@CoachZac:player', JSON.stringify(player)],
            ]);

            this.props.onClose();
            this.props.onDeleted();
            Alert.alert("Foto removida com sucesso!");
        }).catch((e) => {
            Alert.alert("Erro");
            //Alert.alert(JSON.stringify(e.response.data.error));
        });
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
                        <Item style={{ padding: 10, borderColor: '#269cda' }}>
                            <Text style={{ color: '#269cda', fontWeight: 'bold' }}>Defina uma foto de perfil</Text>
                            <Right>
                                <Button transparent onPress={this.props.onClose}>
                                    <Icon name="close-box" size={30} style={{ color: '#E07A2F' }} />
                                </Button>
                            </Right>

                        </Item>

                        <Item style={{ padding: 10, borderColor: '#F1F9FF' }} onPress={this.handlePhotoLibrary}>
                            <Left>
                                <TouchableOpacity onPress={this.handlePhotoLibrary}>
                                    <Icon name="file-multiple" size={24} style={styles.textModal} />
                                </TouchableOpacity>
                            </Left>
                            <TouchableOpacity onPress={this.handlePhotoLibrary}>
                                <Text style={styles.textModal}>Abrir galeria</Text>
                            </TouchableOpacity>
                            <Right>

                            </Right>
                        </Item>
                        <Item style={{ padding: 10, borderColor: '#F1F9FF' }} onPress={this.handlePhotoCamera}>
                            <Left>
                                <TouchableOpacity onPress={this.handlePhotoCamera}>
                                    <Icon name="camera" size={26} style={styles.textModal} />
                                </TouchableOpacity>
                            </Left>
                            <TouchableOpacity onPress={this.handlePhotoCamera}>
                                <Text style={styles.textModal}>Abrir câmera</Text>
                            </TouchableOpacity>
                            <Right></Right>
                        </Item>
                        {this.props.typeUser == 1 || this.props.typeUser == 3
                            ? this.props.existsProfileImage
                                ? this.props.typeUser == 1
                                    ?
                                    <Item style={{ padding: 10, borderColor: '#F1F9FF' }} >
                                        <Left>
                                            <TouchableOpacity onPress={this.deleteUserProfileImage}>
                                                <Icon name="delete" size={30} style={styles.textModal} />
                                            </TouchableOpacity>
                                        </Left>
                                        <TouchableOpacity onPress={this.deleteUserProfileImage}>
                                            <Text style={styles.textModal}>Remover foto</Text>
                                        </TouchableOpacity>
                                        <Right>

                                        </Right>
                                    </Item>
                                    :
                                    <Item style={{ padding: 10, borderColor: '#F1F9FF' }}>
                                        <Left>
                                            <TouchableOpacity onPress={this.deletePlayerProfileImage}>
                                                <Icon name="delete" size={30} style={styles.textModal} />
                                            </TouchableOpacity>
                                        </Left>
                                        <TouchableOpacity onPress={this.deletePlayerProfileImage}>
                                            <Text style={styles.textModal}>Remover foto</Text>
                                        </TouchableOpacity>
                                        <Right>

                                        </Right>
                                    </Item>
                                : null
                            : null
                        }
                    
                    </View>
                </View>

            </Modal>

        );
    }
}


// export default class ProfileModal extends Component {

//     state = {
//         player: [],
//         user: [],
//         photo: "",
//         error: null,
//         sessionToken: ""
//     }

//     async componentDidMount() {
//         //1 - foto do treinador 2 foto no cadastro do atleta 3 atualizacao de foto no perfil do atleta
//         if (this.props.typeUser == 1) {
//             const user = JSON.parse(await AsyncStorage.getItem('@CoachZac:user'));

//             if (user)
//                 this.setState({ user: user });
//             else
//                 this.setState({ error: true });
//         }

//         if(this.props.typeUser==2){


//         }

//         const sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));
//         if (sessionToken != null)
//             this.setState({ sessionToken: sessionToken });

//     };

//     handlePhotoLibrary = async () => {
//         const options = {
//             //noData: true,
//         }

//         ImagePicker.launchImageLibrary(options, response => {

//             if (response.didCancel) {
//                 this.props.onClose();
//             }
//             else if (response.error) {
//                 this.props.onClose();
//             }
//             else {

//                 this.props.onClose();
//                 this.uploadPhoto(response);
//                 //this.setState({photo: response});
//             }
//         });

//     };

//     handlePhotoCamera = () => {
//         const options = {
//             //noData: true,
//         }
//         //launchCamera 
//         ImagePicker.launchCamera(options, response => {

//             if (response.didCancel) {
//                 this.props.onClose();
//             }
//             else if (response.error) {
//                 this.props.onClose();
//             }
//             else {

//                // this.props.onClose();
//                 this.uploadPhoto(response);
//                 //this.setState({photo: response});
//             }
//         });


//     };
//     //"playerId", "name", "email", "dateOfBirth", "weight", "height", "adress", "phone"
//     updateUser = async () => {

//         api.post('/updateUser', {
//             _ApplicationId: 'coachzacId',
//             _SessionToken: this.state.sessionToken,
//             profileImage: this.state.photo

//         }).then((res) => {
//             const user = res.data.result;
//             AsyncStorage.multiSet([
//                 ['@CoachZac:user', JSON.stringify(user)],
//             ]);
//             this.props.onRefresh();
//         }).catch((e) => {
//             this.setState({ error: true });
//         });
//     };

//     uploadPhoto = async (response) => {
//         let data = JSON.stringify(response);

//         let parseFile = new Parse.File(data.fileName, { base64: response.data });
//         const result = await parseFile.save();
//         //resultado esta vindo alterado
//         let temp = JSON.stringify(result).split('https');
//         let url = temp[1];
//         url = url.substr(0, (url.length - 2));
//         this.setState({ photo: 'https' + url });

//         this.updateUser();
//     };


//     componentWillUnmount() {
//         this.props.onClose();
//     };

//     render() {

//         return (

//             <Modal
//                 animationType="fade"
//                 transparent={true}
//                 visible={this.props.visible}
//                 onRequestClose={() => { }}
//             >
//                 <View style={styles.modalContainer}>

//                     <View style={styles.boxContainer}>
//                         <Item style={{ padding: 10, borderColor: '#269cda' }}>
//                             <Text style={{ color: '#269cda', fontWeight: 'bold' }}>Defina uma foto de perfil</Text>
//                             <Right>
//                                 <Button transparent onPress={this.props.onClose}>
//                                     <Icon name="close-box" size={30} style={{ color: '#E07A2F' }} />
//                                 </Button>
//                             </Right>

//                         </Item>

//                         <Item style={{ padding: 10, borderColor: '#F1F9FF' }}>
//                             <Left>
//                                 <TouchableOpacity onPress={this.handlePhotoLibrary}>
//                                     <Icon name="file-multiple" size={24} style={styles.textModal} />
//                                 </TouchableOpacity>
//                             </Left>
//                             <TouchableOpacity onPress={this.handlePhotoLibrary}>
//                                 <Text style={styles.textModal}>Abrir galeria</Text>
//                             </TouchableOpacity>
//                             <Right>

//                             </Right>
//                         </Item>
//                         <Item style={{ padding: 10, borderColor: '#F1F9FF' }}>
//                             <Left>
//                                 <TouchableOpacity onPress={this.handlePhotoCamera}>
//                                     <Icon name="camera" size={26} style={styles.textModal} />
//                                 </TouchableOpacity>
//                             </Left>
//                             <TouchableOpacity onPress={this.handlePhotoCamera}>
//                                 <Text style={styles.textModal}>Abrir câmera</Text>
//                             </TouchableOpacity>
//                             <Right></Right>
//                         </Item>
//                         <Item style={{ padding: 10, borderColor: '#F1F9FF' }} onPress={() => Alert.alert("AAAA")}>
//                             <Left>
//                                 <TouchableOpacity>
//                                     <Icon name="delete" size={30} style={styles.textModal} />
//                                 </TouchableOpacity>
//                             </Left>
//                             <TouchableOpacity>
//                                 <Text style={styles.textModal}>Remover foto</Text>
//                             </TouchableOpacity>
//                             <Right>

//                             </Right>
//                         </Item>

//                     </View>
//                 </View>

//             </Modal>

//         );
//     }
// }
