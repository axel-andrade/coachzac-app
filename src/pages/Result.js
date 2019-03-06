import React, { Component } from 'react';
import { Text, View, AsyncStorage, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/Tab';
import { Container, Header, Item, Input, Content } from 'native-base';
import api from '../services/api';
import ResultList from '../components/ResultList';

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
    count: null
  };

  async componentDidMount() {
    this._isMounted = true;


    const config = JSON.parse(await AsyncStorage.getItem('@CoachZac:configAnalyze'));
    //alert(config.hasChangeAnalyze)
    const sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));
    //if (this._isMounted) {

    if (config.hasChangeAnalyze) {
      this.setState({ sessionToken: sessionToken, loading: true });
      this.getAnalyzes();
    }
    else {
      let analyzes = JSON.parse(await AsyncStorage.getItem('@CoachZac:analyzes'));
      let total = await AsyncStorage.getItem('@CoachZac:totalAnalyze');
      this.setState({ sessionToken: sessionToken, loading: false, analyzes: analyzes, count: parseInt(total) });
    }

    //}
  }

  componentWillUnmount() {
    //this._isMounted = false;
  }


  getAnalyzes = async () => {

    //if (this._isMounted) {
    //Alert.alert(this.state.sessionToken);
    api.post('/getAnalyzesMostRecent', {
      _ApplicationId: 'coachzacId',
      _SessionToken: this.state.sessionToken
    }).then((res) => {
      //AsyncStorage.multiSet([['@CoachZac:players', JSON.stringify(res.data.result)]]);
      AsyncStorage.multiSet([
        ['@CoachZac:analyzes', JSON.stringify(res.data.result.analyzes)],
        ['@CoachZac:totalAnalyze', JSON.stringify(res.data.result.total)],
        ['@CoachZac:configAnalyze', JSON.stringify({ hasChangeAnalyze: false })],
      ]);
      this.setState({ loading: false, analyzes: res.data.result.analyzes, count: parseInt(res.data.result.total) });
    }).catch((e) => {
      this.setState({ loading: false, error: true });
      //Alert.alert(JSON.stringify(e.response.data.error));
    });
    // }
  };

  render() {


    return (


      <View>

        {this.state.loading
          ? <ActivityIndicator style={{ paddingTop: '2%' }} size='large' color="#C9F60A" />
          : this.state.error
            ? <View style={{ padding: '5%', alignItems: 'center' }} >
              <Text style={{ color: 'red', fontSize: 14 }}>Ops ... algo deu errado! :( </Text>
            </View>
            : this.state.count === null
              ? null
              : this.state.count !== 0
                ? <View>
                  <View style={{ paddingRight: 10, alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 10 }}>{this.state.count + " avaliações"}</Text>
                  </View>
                  <ResultList
                    analyzes={this.state.analyzes}
                    onPress={(params) => this.props.navigation.navigate('ResultDetail', params)}
                  />
                </View>
                : <View style={{ padding: '5%', alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, color: "gray" }}>Você ainda não cadastrou avaliações.</Text>
                </View>

        }
        
      </View>

    );
  }
}

