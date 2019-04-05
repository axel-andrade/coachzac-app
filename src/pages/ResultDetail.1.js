import React, { Component } from 'react';
import { ListView, View, StyleSheet, TouchableOpacity, ScrollView, Alert, AsyncStorage } from 'react-native';
import { Container, Item, Thumbnail, Header, Content, Button, List, ListItem, Text, Left, Body, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const profileImage = require('../../assets/profile.png');
import ProfileModal from '../components/ProfileModal';
import PhotoModal from '../components/PhotoModal';
import ChartScaleBand from '../components/ChartScaleBand';

export default class ResultDetail extends Component {

    state = {
        analyze: [],
        player: [],
        existsProfileImage: false,
        modalVisible: false,
        fromListItem: true,
        modalPhotoVisible: false,
        good: [],
        medium: [],
        bad: [],
        data: [],
        keys: []
    };

    async componentDidMount() {

        alert(JSON.stringify(this.props.navigation.state.params.analyze))

        //verificando se o componente esta vindo da list item 
        //if (this.state.fromListItem) {

            let good = this.getSteps(this.props.navigation.state.params.analyze.player.goodSteps);
            let medium = this.getSteps(this.props.navigation.state.params.analyze.player.mediumSteps);
            let bad = this.getSteps(this.props.navigation.state.params.analyze.player.badSteps);
            let existsProfileImage;
            //Alert.alert("Veio do list item");
            if (this.props.navigation.state.params.analyze.player.profileImage != undefined)
                existsProfileImage = true;
            else
                existsProfileImage = false;

            this.setState({
                analyze: this.props.navigation.state.params.analyze,
                player: this.props.navigation.state.params.analyze.player,
                existsProfileImage: existsProfileImage,
                good: good,
                medium: medium,
                bad: bad

            });
            await AsyncStorage.multiSet([
                ['@CoachZac:analyze', JSON.stringify(this.props.navigation.state.params.analyze)],
            ]);
        //}
    }

    getSteps(step) {
        let data = [];
        if (step) {
            for (let i = 0; i < step.length; i++)
                data.push(<Text note style={{ fontSize: 10, paddingTop: "2%" }}>{"- " + step[i]}</Text>)
        }
        else
            data.push(<Text note style={{ fontSize: 10, paddingTop: "2%" }}>{"- Nenhum"}</Text>)
        return data;
    };

    renderInfo = (name, state) => {
        return (
            <Text note style={styles.note}>
                <Text note style={[styles.note, styles.noteBold]}>{name}</Text>
                {state}
            </Text>
        );
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

    render() {
        return (

            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-left" size={22.5} color='#269cda' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color:'#269cda'}}>Resultado</Title>
                    </Body>
                    <Right></Right>
                </Header>

                <View style={{paddingLeft:'5%',paddingTop:'2%'}}>

                    {this.renderInfo("Name: ", this.state.player.name)}
                    {this.renderInfo("Fundamento: ", "Saque")}
                    {this.renderInfo("Nota: ", this.state.analyze.average)}
                    {this.renderInfo("Data: ", "")}
                    
                </View >

                <View>
                    {this.renderFundaments('green', 'green', this.state.good, 'Bons')}
                    {this.renderFundaments('#FFD700', '#FFD700', this.state.medium, "Médios")}
                    {this.renderFundaments('red', 'red', this.state.bad, "Ruins")}
                </View>

                <ChartScaleBand
                    data={this.state.data}
                    keys={this.state.keys}
                />


            </Container>
        );
    };

}

const styles = StyleSheet.create({
    note: {
        fontSize: 12
    },
    noteBold: {
        fontWeight: 'bold',
        color: '#269cda'
    },
    buttonEnviar: {
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: 115, height: 49,
        backgroundColor: '#E07A2F',

        borderRadius: 23,
    },
    icon: {
        paddingLeft: '15%', color: "#269cda"
    }
});