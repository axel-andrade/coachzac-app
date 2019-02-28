import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HeaderPlayer from '../components/HeaderPlayer';
import Player from '../pages/Player';
import Account from '../pages/Account';
import Analyze from '../pages/Analyze';
import Result from '../pages/Result';
import PlayerForAnalyze from '../pages/PlayerForAnalyze';

import { View, TouchableOpacity, StyleSheet, AsyncStorage, Alert, Image } from 'react-native';

import {
    Container,
    Content,
    Header,
    Body,
    Title,
    Form,
    Item,
    Input,
    Spinner,
    Button,
    Text,
    Footer,
    FooterTab

} from "native-base";

import api from '../services/api';
import CreatePlayer from '../pages/CreatePlayer';

export default class Home extends Component {

    _isMounted = false;

    async componentDidMount() {
        
        this._isMounted = true;
        const sessionToken = await AsyncStorage.getItem('@CoachZac:sessionToken');
        //let page = this.props.navigation.getParam('page', 0);
        //if(page === 0 )
        this.setState({ sessionToken: sessionToken })//, page: page !== 0 ? page : 3 });
        //else
        //   this.setState({ sessionToken: sessionToken, page: page});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    state = {
        page: this.props.navigation.getParam('page', 0) === 0 ? 3 : this.props.navigation.getParam('page', 0),
        sessionToken: "",
        nameHeader: "Avaliações",
        players: []
    };

    onChangePage(page) {
        this.setState({ page: page })
    }

    renderPage = () => {
        switch (this.state.page) {
            case 1: return <Player
                navigation={this.props.navigation}
                onChangePage={(page) => this.setState({ page: page })}
            />
                break;
            case 2: return <Result navigation={this.props.navigation} />
                break;
            case 3: return <Analyze />
                break;
            case 4:
                break;
            case 5: return <Account navigation={this.props.navigation} />
                break;

            case 6: return <PlayerForAnalyze navigation={this.props.navigation} />
                break;

            default: break;

        }
    }

    render() {
        return (

            <Container>

                {this.state.page === 1 ? <HeaderPlayer nameHeader={this.state.nameHeader} /> : null} 
                {this.state.page === 2 ? <HeaderPlayer nameHeader={this.state.nameHeader} /> : null}

                <Content>
                    {this.renderPage()}
                </Content>

                {this.state.page === 1 || this.state.page === 3
                    ? this.state.page === 1
                        ? <View style={{ alignItems: 'flex-end', position: "absolute", backgroundColor: 'transparent', top: '73%', left: '72%' }}>
                            <TouchableOpacity onPress={
                                () => this.props.navigation.navigate("CreatePlayer", {
                                    'onChangePage': (page) => this.onChangePage(page)
                                })
                            }>
                                <Icon name="plus-circle" size={70} style={{ color: '#C9F60A' }} />
                            </TouchableOpacity>
                        </View>

                        : <View style={{ alignItems: 'flex-end', position: "absolute", backgroundColor: 'transparent', top: '73%', left: '65%' }}>
                            <Button rounded style={{ backgroundColor: '#E07A2F' }} onPress={() => this.props.navigation.navigate("PlayerForAnalyze")}>
                                <Text style={{ color: 'white' }}>Começar</Text>
                            </Button>
                        </View>
                    : null
                }

                <Footer>
                    <FooterTab style={{ backgroundColor: 'white' }}>
                        <Button transparent vertical onPress={() => this.setState({ page: 1, nameHeader: "Atletas" })}>
                            {this.state.page === 1  ? <Icon name="account-multiple" size={30} style={styles.orange} /> : <Icon name="account-multiple" size={30} style={styles.blue} />}
                        </Button>
                        <Button transparent vertical onPress={() => this.setState({ page: 2, nameHeader: "Avaliações" })}>
                            {this.state.page === 2 ? <Icon name="clipboard-pulse-outline" size={30} style={styles.orange} /> : <Icon name="clipboard-pulse-outline" size={30} style={styles.blue} />}
                        </Button>
                        <Button transparent vertical onPress={() => this.setState({ page: 3 })}>
                            {this.state.page === 3 || this.state.page === 6 ? <Icon name="tennis" size={30} style={styles.orange} /> : <Icon name="tennis" size={30} style={styles.blue} />}
                        </Button>
                        <Button transparent vertical onPress={() => this.setState({ page: 4 })}>
                            {this.state.page === 4 ? <Icon name="calendar-clock" size={30} style={styles.orange} /> : <Icon name="calendar-clock" size={30} style={styles.blue} />}
                        </Button>
                        <Button transparent vertical onPress={() => this.setState({ page: 5 })}>
                            {this.state.page === 5 ? <Icon name="settings" size={30} style={styles.orange} /> : <Icon name="settings" size={30} style={styles.blue} />}
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>

        );
    }
}

const styles = StyleSheet.create({

    buttonEnviar: {
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: 49,
        backgroundColor: '#269cda',
        borderRadius: 23,
    },
    textTab: {
        fontWeight: 'bold',
        fontFamily: 'Exo Medium',
        fontSize: 6,
    },
    blue: {
        color: '#269cda'
    },
    orange: {
        color: '#E07A2F'
    }
});

/* <Button vertical onPress={() => this.setState({ page: 1 })}>
    {this.state.page === 1 ? <Icon name="account-multiple" size={25} style={styles.orange} /> : <Icon name="account-multiple" size={25} style={styles.blue} />}
    {this.state.page === 1 ? <Text style={[styles.textTab, styles.orange]}>Atletas</Text> : <Text style={[styles.textTab, styles.blue]}>Atletas</Text>}
</Button>
    <Button vertical onPress={() => this.setState({ page: 2 })}>
        {this.state.page === 2 ? <Icon name="clipboard-pulse-outline" size={25} style={styles.orange} /> : <Icon name="clipboard-pulse-outline" size={25} style={styles.blue} />}
        {this.state.page === 2 ? <Text style={[styles.textTab, styles.orange]}>Atletas</Text> : <Text style={[styles.textTab, styles.blue]}>Resultados</Text>}
    </Button>
    <Button vertical onPress={() => this.setState({ page: 3 })}>
        {this.state.page === 3 ? <Icon name="tennis" size={27} style={styles.orange} /> : <Icon name="tennis" size={27} style={styles.blue} />}
        {this.state.page === 3 ? <Text style={[styles.textTab, styles.orange]}>Atletas</Text> : <Text style={[styles.textTab, styles.blue]}>Avaliar</Text>}
    </Button>
    <Button vertical onPress={() => this.setState({ page: 4 })}>
        {this.state.page === 4 ? <Icon name="calendar-clock" size={25} style={styles.orange} /> : <Icon name="calendar-clock" size={25} style={styles.blue} />}
        {this.state.page === 4 ? <Text style={[styles.textTab, styles.orange]}>Atletas</Text> : <Text style={[styles.textTab, styles.blue]}>Agenda</Text>}
    </Button>
    <Button vertical onPress={() => this.setState({ page: 5 })}>
        {this.state.page === 5 ? <Icon name="settings" size={25} style={styles.orange} /> : <Icon name="settings" size={25} style={styles.blue} />}
        {this.state.page === 5 ? <Text style={[styles.textTab, styles.orange]}>Atletas</Text> : <Text style={[styles.textTab, styles.blue]}>Conta</Text>}
    </Button> */