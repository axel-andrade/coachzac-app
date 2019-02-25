import React, { Component } from 'react';
import { Text, View, AsyncStorage, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/Tab';
import { Container, Header, Item, Input, Content } from 'native-base';
import api from '../services/api';
import PlayerList from '../components/PlayerList';
import PhotoModal from '../components/PhotoModal';

export default class Player extends Component {
  static navigationOptions = {
    tabBarLabel: "Tab1"
  }

  _isMounted = false;

  static navigationOptions = {
    header: null
  };

  state = {
    sessionToken: "",
    players: [],
    loading: false,
    error: false,
    modalPhotoVisible: false,
    uriSelectPlayer: "",
    playerSelected: [],
    favorited: false,
    count: ""
  };

  async componentDidMount() {
  
    this._isMounted = true;

    const config = JSON.parse(await AsyncStorage.getItem('@CoachZac:configPlayer'));
    //alert(config.hasChangePlayer);
    const sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));
    if (this._isMounted) {

      if (config.hasChangePlayer) {
        this.setState({ sessionToken: sessionToken, loading: true });
        this.getPlayers();
      }
      else {
        let players =JSON.parse( await AsyncStorage.getItem('@CoachZac:players'));
        let total = await AsyncStorage.getItem('@CoachZac:totalPlayer');
        this.setState({ sessionToken: sessionToken, loading: false, players: players, count: total });
      }

    }

  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  getPlayers = async () => {

    if (this._isMounted) {
      //Alert.alert(this.state.sessionToken);
      api.post('/getPlayers', {
        _ApplicationId: 'coachzacId',
        _SessionToken: this.state.sessionToken
      }).then((res) => {
        AsyncStorage.multiSet([
          ['@CoachZac:players', JSON.stringify(res.data.result.players)],
          ['@CoachZac:totalPlayer', JSON.stringify(res.data.result.total)],
          ['@CoachZac:configPlayer', JSON.stringify({hasChangePlayer:false})],
        ]);
        this.setState({ loading: false, players: res.data.result.players, count: res.data.result.total });
      }).catch((e) => {
        this.setState({ loading: false, error: true });
        Alert.alert(JSON.stringify(e.response.data.error));
      });
    }
  };

  render() {

    const {onChangePage} = this.props;
    return (


      <View>
        {this.state.loading
          ? <ActivityIndicator style={{ paddingTop: '2%' }} size='large' color="#C9F60A" />
          : this.state.error
            ? <Text style={{ color: 'red', alignSelf: 'center' }}>Ops ... algo deu errado! :( </Text>
            : <View>
              <View style={{ paddingRight: 10, alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 10 }}>{this.state.count + " atleta(s)"}</Text>
              </View>
              <PlayerList
                players={this.state.players}
                onPress={(params) => this.props.navigation.navigate('PlayerProfile', params)}
                onLongPress={(uri) => this.setState({ modalPhotoVisible: true, uriSelectPlayer: uri })}
                onFavorited={(playerSelected) => this.setState({
                  playerSelected: playerSelected,
                  favorited: !playerSelected.favorited
                })}
              />
            </View>
        }

        <PhotoModal
          uri={this.state.uriSelectPlayer}
          onClose={() => this.setState({ modalPhotoVisible: false })}
          visible={this.state.modalPhotoVisible}
        />
      </View>

    );
  }
}

