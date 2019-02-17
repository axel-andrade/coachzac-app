
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { TouchableOpacity, Text, View, AsyncStorage, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Header, Item, Input, Content, InputGroup, Left, Right, Thumbnail, Body } from 'native-base';
import HeaderPlayer from '../components/HeaderPlayer';
import api from '../services/api';
import ProfileModal from '../components/ProfileModal';
import PhotoModal from '../components/PhotoModal';

const profileImage = require('../../assets/profile.png');

export default class Account extends Component {


    state = {
        sessionToken: "",
        user: [],
        existsProfileImage: null,
        error: false,
        modalVisible: false,
        modalPhotoVisible: false,
    };

    async componentDidMount() {

        this.refreshProfile();

    };

    refreshProfile = async () => {

        const user = JSON.parse(await AsyncStorage.getItem('@CoachZac:user'));
        if (user)
            this.setState({ user: user });
        else
            this.setState({ error: true });

        if (user.profileImage)
            this.setState({ existsProfileImage: true })
        else
            this.setState({ existsProfileImage: false })

    };

    renderOption = (iconName, optionName, page) => {

        return (


            <View style={{ backgroundColor: '#F1F9FF', borderColor: 'white', padding: 10, flexDirection: 'row' }}>

                <View>
                    <Left style={{ alignItems: 'center' }}>
                        <Icon name={iconName} size={25} style={{ color: '#269cda' }} />
                    </Left>
                </View>
                <View style={{ paddingLeft: '10%', justifyContent: 'center' }}>
                    <Text style={styles.title}>{optionName}</Text>
                </View>

            </View>


        );
    };

    logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate("Login");
    }

    render() {


        return (

            <Content padder>

                <Item style={{ borderColor: 'white', paddingTop: '5%' }}>
                    <Left style={{ alignItems: 'center' }}>

                        {this.state.existsProfileImage

                            ? <TouchableOpacity onPress={() => this.setState({ modalVisible: true })} onLongPress={() => this.setState({ modalPhotoVisible: true })}>
                                <Thumbnail large source={{ uri: this.state.user.profileImage }} />
                            </TouchableOpacity>

                            : <TouchableOpacity onPress={() => this.setState({ modalVisible: true })} >
                                <Thumbnail large source={profileImage} />
                            </TouchableOpacity>
                        }

                    </Left>
                    <Body style={{ alignItems: 'flex-start' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: "#269cda" }}>{this.state.user.name}</Text>
                        <Text style={{ fontSize: 12, color: '#269cda' }}>{this.state.user.team}</Text>
                    </Body>
                    <Right style={{ alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Icon name="pencil" size={30} style={{ color: '#269cda' }} />
                        </TouchableOpacity>
                    </Right>
                </Item>

                <View style={{ paddingTop: '10%', padding: '10%' }}>
                    <View style={{ paddingTop: "10%" }}>
                        <TouchableOpacity>
                            {this.renderOption("bell", "Notificações", "Notifications")}
                        </TouchableOpacity>
                        <TouchableOpacity>
                            {this.renderOption("settings", "Configurações", "Settings")}
                        </TouchableOpacity>
                        <TouchableOpacity>
                            {this.renderOption("account", "Conta", "AccountDetail")}
                        </TouchableOpacity>
                        <TouchableOpacity>
                            {this.renderOption("lock", "Privacidade", "Privacy")}
                        </TouchableOpacity>
                        <TouchableOpacity>
                            {this.renderOption("help-circle", "Ajuda", "Help")}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.logOut}>
                            {this.renderOption("logout", "Sair", "Help")}
                        </TouchableOpacity>
                    </View>

                </View>
                <ProfileModal
                    existsProfileImage={this.state.existsProfileImage}
                    onRefresh={this.refreshProfile}
                    onClose={() => this.setState({ modalVisible: false })}
                    visible={this.state.modalVisible}
                    typeUser={1}
                />

                <PhotoModal
                    uri={this.state.user.profileImage}
                    onClose={() => this.setState({ modalPhotoVisible: false })}
                    visible={this.state.modalPhotoVisible}
                />
            </Content>

        );

    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 14, color: '#269cda', fontWeight: 'bold'
    }
});