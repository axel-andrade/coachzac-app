import React, { Component } from 'react';
import { Text, View, AsyncStorage, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/Tab';
import { Container, Header, Item, Input, Content } from 'native-base';
import api from '../services/api';
import ResultList from '../components/ResultList';
import RegisterPlayer from '../pages/RegisterPlayer';
import PhotoModal from '../components/PhotoModal';

export default class Result extends Component {

  _isMounted = false;

  static navigationOptions = {
    header: null
  };

  state = {
    sessionToken: "",
    analyzes: [],
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

    //setTimeout(async () => {
    const sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));
    if (this._isMounted) {
      this.setState({ sessionToken: sessionToken, loading: true });
      this.getAnalyzes();
    }

  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  getAnalyzes = async () => {

    if (this._isMounted) {
      //Alert.alert(this.state.sessionToken);
      api.post('/getAnalyzesMostRecent', {
        _ApplicationId: 'coachzacId',
        _SessionToken: this.state.sessionToken
      }).then((res) => {
        //AsyncStorage.multiSet([['@CoachZac:players', JSON.stringify(res.data.result)]]);
        this.setState({ loading: false, analyzes: res.data.result.analyzes, count: res.data.result.total});
      }).catch((e) => {
        this.setState({ loading: false, error: true });
        //Alert.alert(JSON.stringify(e.response.data.error));
      });
    }
  };

  render() {


    return (


      <View>

        {this.state.loading
          ? <ActivityIndicator style={{ paddingTop: '2%' }} size='large' color="#C9F60A" />
          : this.state.error
            ? <Text style={{ color: 'red', alignSelf: 'center' }}>Ops ... algo deu errado! :( </Text>
            : <View>
            <View style={{paddingRight: 10, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 10}}>{this.state.count + " avaliações"}</Text>
            </View>
            <ResultList
                analyzes={this.state.analyzes}
                onPress={(params) => this.props.navigation.navigate('ResultDetail', params)}
              />
            </View>
        }
       
      </View>

    );
  }
}

