import React, { Component } from 'react';
import { Text, View, AsyncStorage, Alert, ActivityIndicator, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/Tab';
import { Container, Button, Header, Item, Input, Content, Footer, Left, Body, Right, Title } from 'native-base';
import api from '../services/api';
import PlayerList from '../components/PlayerList';
import PhotoModal from '../components/PhotoModal';
import HeaderPlayer from '../components/HeaderPlayer';

export default class PlayerForAnalyze extends Component {
    _isMounted = false;

    state = {
        sessionToken: "",
        players: [],
        existsPlayer: true,
        modalPhotoVisible: false,
        uriSelectPlayer: "",
        playerSelected: [],
        favorited: false,
        count: "",
        error: false,
        restart: false
    };

    async componentDidMount() {

        // this._isMounted = true;

        const configP = JSON.parse(await AsyncStorage.getItem('@CoachZac:configPlayer'));
        const configA = JSON.parse(await AsyncStorage.getItem('@CoachZac:configAnalyze'));
        const sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));
        // if (this._isMounted) {

        //alert("changePlayer: "+configP.hasChangePlayer+" changeAnalyze:  "+configA.hasChangeAnalyze);

        if (configP.hasChangePlayer || configA.hasChangeAnalyze) {
            this.setState({ sessionToken: sessionToken, loading: true });
            this.getPlayers();
        }
        else {
            let players = JSON.parse(await AsyncStorage.getItem('@CoachZac:players'));
            let total = await AsyncStorage.getItem('@CoachZac:totalPlayer');
            this.setState({ sessionToken: sessionToken, loading: false, players: players, count: total });
        }

    //}
};
getPlayers = async () => {

    //if (this._isMounted) {
    //Alert.alert(this.state.sessionToken);
    api.post('/getPlayers', {
        _ApplicationId: 'coachzacId',
        _SessionToken: this.state.sessionToken,
        order: "+name"
    }).then((res) => {
        AsyncStorage.multiSet([
            ['@CoachZac:players', JSON.stringify(res.data.result.players)],
            ['@CoachZac:totalPlayer', JSON.stringify(res.data.result.total)],
            ['@CoachZac:configPlayer', JSON.stringify({ hasChangePlayer: false })],
        ]);
        this.setState({ loading: false, players: res.data.result.players, count: res.data.result.total });
    }).catch((e) => {
        this.setState({ loading: false, error: true });
        Alert.alert(JSON.stringify(e.response.data.error));
    });
    //  }
};

componentWillUnmount() {
    this._isMounted = false;
}
render() {
    return (


        <Container>
            <Header style={{ backgroundColor: 'white' }}>

                <Button transparent onPress={() => this.props.navigation.navigate("Home", { page: 3})}>
                    <Icon name="arrow-left" size={22.5} color='#269cda' />
                </Button>

                <Body style={{ paddingLeft: '5%' }}>
                    <Title style={{ color: '#269cda' }}> Avaliar Atleta</Title>
                    <Text style={{ fontSize: 10, color: '#269cda' }}>Selecione um(a) atleta para avaliação: </Text>
                </Body>

                <Button transparent>
                    <Icon name="tune" size={22.5} color='#269cda' />
                </Button>

            </Header>

            {this.state.loading
                ? <ActivityIndicator style={{ paddingTop: '2%' }} size='large' color="#C9F60A" />
                : this.state.error
                    ? <Text style={{ color: 'red' }}>Ops ... algo deu errado! :( </Text>
                    : this.state.players[0]
                        ? <PlayerList
                            players={this.state.players}
                            onPress={(params) => this.props.navigation.navigate('InitAnalyze', params)}
                            onLongPress={(uri) => this.setState({ modalPhotoVisible: true, uriSelectPlayer: uri })}
                            onFavorited={(playerSelected) => this.setState({
                                playerSelected: playerSelected,
                                favorited: !playerSelected.favorited
                            })}
                            type={2}
                        />
                        : null

            }


            <PhotoModal
                uri={this.state.uriSelectPlayer}
                onClose={() => this.setState({ modalPhotoVisible: false })}
                visible={this.state.modalPhotoVisible}
            />
        </Container>

    );
}
}

