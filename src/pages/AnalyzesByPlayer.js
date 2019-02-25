import React, { Component } from 'react';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

import { Text, View, AsyncStorage, Alert, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/Tab';
import { Container, Form, Header, Item, Input, Content, Left, Right, Body, Button, Picker, Title } from 'native-base';
import api from '../services/api';
import ResultList from '../components/ResultList';
import PhotoModal from '../components/PhotoModal';
import ChartScaleBand from '../components/ChartScaleBand';

export default class AnalyzesByPlayer extends Component {

  _isMounted = false;

  static navigationOptions = {
    header: null
  };

  state = {
    sessionToken: "",
    analyzes: [],
    loading: false,
    error: false,
    player: [],
    count: "",
    genre: ""
  };

  async componentDidMount() {
    this._isMounted = true;

    //setTimeout(async () => {
    const sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));
    const player = JSON.parse(await AsyncStorage.getItem('@CoachZac:player'));
    if (this._isMounted) {
      this.setState({ sessionToken: sessionToken, player: player, loading: true });
      this.getAnalyzes();
    }

  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  getAnalyzes = async () => {

    if (this._isMounted) {
      //Alert.alert(this.state.sessionToken);
      api.post('/getAnalyzesByPlayer', {
        _ApplicationId: 'coachzacId',
        _SessionToken: this.state.sessionToken,
        playerId: this.state.player.objectId
      }).then((res) => {
        //AsyncStorage.multiSet([['@CoachZac:players', JSON.stringify(res.data.result)]]);
        this.setState({ loading: false, analyzes: res.data.result.analyzes, count: res.data.result.total });
      }).catch((e) => {
        this.setState({ loading: false, error: true });
        //Alert.alert(JSON.stringify(e.response.data.error));
      });
    }
  };

  onValueChange(value) {
    this.setState({
      genre: value
    });
  };

  render() {

    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

    return (

      <Container>
        <Header style={{ backgroundColor: 'white' }}>

          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-left" size={22.5} color='#269cda' />
          </Button>

          <Body style={{ paddingLeft: '5%' }}>
            <Title style={{ color: '#269cda' }}>Avaliações do Atleta</Title>
          </Body>

          <Button transparent onPress={() => this.props.navigation.navigate("Home", { page: 3 })}>
            <Icon name="tune" size={22.5} color='#269cda' />
          </Button>

        </Header>
        <ChartScaleBand
          array={this.state.player}
        />

        <View style={{ paddingRight: 10, alignItems: 'flex-end', borderTopWidth: 1, borderTopColor: '#F1F9FF' }}>
          <Text style={{ fontSize: 10 }}>{this.state.count + " avaliações"}</Text>
        </View>
        <Content>
          {this.state.loading
            ? <ActivityIndicator style={{ paddingTop: '2%' }} size='large' color="#C9F60A" />
            : this.state.error
              ? <Text style={{ color: 'red', alignSelf: 'center' }}>Ops ... algo deu errado! :( </Text>
              : <ResultList
                analyzes={this.state.analyzes}
                onPress={(params) => this.props.navigation.navigate('ResultDetail', params)}
              />
          }
        </Content>

      </Container>

    );
  }
}


