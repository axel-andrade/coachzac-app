import React, { Component } from 'react';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

import { Text, View, AsyncStorage, Alert, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/Tab';
import { Container, Form, Header, Title, Item, Input, Content, Left, Right, Body, Button, Picker } from 'native-base';
import api from '../services/api';
import ResultList from '../components/ResultList';
import PhotoModal from '../components/PhotoModal';
import ChartScaleBand from '../components/ChartScaleBand';

export default class ResultByPlayer extends Component {

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
        genre: "",
        data: [],
        keys: [],
        good: [],
        medium: [],
        bad: []
    };

    async componentDidMount() {

       
        //setTimeout(async () => {
        let sessionToken = JSON.parse(await AsyncStorage.getItem('@CoachZac:sessionToken'));
        let player = JSON.parse(await AsyncStorage.getItem('@CoachZac:player'));
        let data = this.getValues(player.points);
        let keys = this.getKeys(player.points);
        let good = this.getSteps(this.props.navigation.state.params.good);
        let medium = this.getSteps(this.props.navigation.state.params.medium);
        let bad = this.getSteps(this.props.navigation.state.params.bad);

        //alert(JSON.stringify(data));

        this.setState({
            sessionToken: sessionToken,
            player: player,
            loading: true,
            data: data,
            keys: keys,
            good: good,
            medium: medium,
            bad:  bad  
        });
    }

    componentWillUnmount() {

    }

    getSteps(step) {
        let data = [];
        if (step[0]) {
            for (let i = 0; i < step.length; i++)
                data.push(<Text style={{ color: '#555555',fontSize: 12, paddingTop: "2%" }}>{"- " + step[i]}</Text>)
        }
        else
            data.push(<Text style={{ color: '#555555',fontSize: 12, paddingTop: "2%" }}>{"- Nenhum"}</Text>)
        return data;
    };

    renderFundaments = (borderColor, color, step, nameStep) => {

       
        return (

            <View style={{ paddingTop: '3%', paddingLeft: '5%', paddingRight: '5%' }}>
                <View style={{ backgroundColor: "white", borderWidth: 1, borderColor: `${borderColor}`, alignItems: 'center', justifyContent: "center" }}>
                    <Text style={{ fontSize: 12, color: `${color}`, padding: 3, fontWeight: "bold" }}>{"Passos " + nameStep}</Text>
                </View>
                {step}
            </View>


        )
    };

    onValueChange(value) {
        this.setState({
            genre: value
        });
    };

    getValues(array) {
        let data = [];
        for (key in array)
            data.push(array[key])
        return data;
    }

    getKeys(array) {
        let data = [];
        for (key in array)
            data.push(key)
        return data;
    }




    render() {

        let {good, medium, bad} = this.state;

        return (

            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-left" size={22.5} color='#269cda' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color:'#269cda'}}>Resultados</Title>
                    </Body>
                    <Right>
                        <Button hasText transparent onPress={()=>this.props.navigation.navigate("AnalyzesByPlayer")}>
                            <Text style={{ color: '#269cda' }}>Ver Avaliações</Text>
                        </Button>
                    </Right>
                </Header>

                <Content>

                <View style={{ paddingTop: 10 }}>
                    {this.renderFundaments('green', 'green', good, 'Bons')}
                    {this.renderFundaments('#FFD700', '#FFD700', medium, "Médios")}
                    {this.renderFundaments('red', 'red', bad, "Ruins")}
                </View>

                <ChartScaleBand
                    data={this.state.data}
                    keys={this.state.keys}
                />
                
               
            </Content>
        
            </Container>

        );
    }
}


