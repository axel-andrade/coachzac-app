import React, { Component } from 'react';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

import { Text, View, AsyncStorage, Alert, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/Tab';
import { Container, Header, Item, Input, Content, Left, Right, Body, Button } from 'native-base';
import api from '../services/api';
import ResultList from '../components/ResultList';
import RegisterPlayer from './RegisterPlayer';
import PhotoModal from '../components/PhotoModal';
import ChartScaleBand from  '../components/ChartScaleBand';

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
    count: ""
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

  render() {

    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ];

    return (

      <Container>
        <Header style={{ backgroundColor: 'white', justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-left" size={22.5} color='#269cda' />
            </Button>
          </Left>

          <Text style={{ color: '#269cda', fontSize: 20, fontWeight: 'bold' }}>Avaliações do Atleta</Text>
          <Right></Right>

        </Header>
        <Content padder style={{backgroundColor:'white'}}>
          <View style={{ paddingRight: 10, alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 10 }}>{this.state.count + " avaliações"}</Text>
          </View>
          
          <ChartScaleBand 
            array={this.state.player}
          />
          
          
        </Content>
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


