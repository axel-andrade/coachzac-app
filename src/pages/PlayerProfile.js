import React, { Component } from 'react';
import { ListView, View, StyleSheet, TouchableOpacity, ScrollView, Alert, AsyncStorage } from 'react-native';
import { Container, Item, Thumbnail, Header, Content, Button, List, ListItem, Text, Left, Body, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const profileImage = require('../../assets/profile.png');
import ProfileModal from '../components/ProfileModal';
import PhotoModal from '../components/PhotoModal';
import ChartScaleBand from '../components/ChartScaleBand';

export default class PlayerProfile extends Component {

    state = {
        player: [],
        existsProfileImage: false,
        modalVisible: false,
        fromListItem: true,
        modalPhotoVisible: false,
        good: [],
        medium: [],
        bad: []

    };

    async componentDidMount() {

        //verificando se o componente esta vindo da list item 
        if (this.state.fromListItem) {

            let good = this.getSteps(this.props.navigation.state.params.player.goodSteps);
            let medium = this.getSteps(this.props.navigation.state.params.player.mediumSteps);
            let bad = this.getSteps(this.props.navigation.state.params.player.badSteps);
            let existsProfileImage;
            //Alert.alert("Veio do list item");
            if (this.props.navigation.state.params.player.profileImage != undefined)
                existsProfileImage = true;
            else
                existsProfileImage = false;

            this.setState({
                player: this.props.navigation.state.params.player,
                existsProfileImage: existsProfileImage,
                good: good,
                medium: medium,
                bad: bad

            });
            await AsyncStorage.multiSet([
                ['@CoachZac:player', JSON.stringify(this.props.navigation.state.params.player)],
            ]);
        }

    };

    renderInfo = (name, state) => {
        return (
            <Text note style={styles.note}>
                <Text note style={[styles.note, styles.noteBold]}>{name}</Text>
                {state}
            </Text>
        );
    };

    getNewDataStorage = async () => {

        //Alert.alert("Não veio do list item");
        const player = JSON.parse(await AsyncStorage.getItem('@CoachZac:player'));
        if (player)
            this.setState({ player: player });
    };

    imageDeleted = async () => {

        this.setState({ existsProfileImage: false, fromListItem: false });
        this.getNewDataStorage();

    };

    imageCreated = async () => {

        this.setState({ existsProfileImage: true, fromListItem: false });
        this.getNewDataStorage();

    };

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

    render() {

        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }}>

                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-left" size={22.5} color='#269cda' />
                    </Button>

                    <Body style={{ paddingLeft: '5%' }}>
                    <Title style={{color:'#269cda'}}>Perfil do Atleta</Title>

                    </Body>
                </Header>
              
                <Content>
                    <View style={{ backgroundColor: "white", paddingTop: '10%', paddingLeft: '5%', paddingBottom: '5%' }}>
                        <Item style={{ borderColor: 'white' }}>
                            <Left>

                                {this.state.existsProfileImage
                                    ? <TouchableOpacity onPress={() => this.setState({ modalVisible: true })} onLongPress={() => this.setState({ modalPhotoVisible: true })}>
                                        <Thumbnail large source={{ uri: this.state.player.profileImage }} />
                                    </TouchableOpacity>
                                    : <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
                                        <Thumbnail large source={profileImage} />
                                    </TouchableOpacity>
                                }

                            </Left>
                            <Body>
                                <Body>
                                </Body>
                            </Body>
                            <Right style={{ flexDirection: 'row' }}>
                                <TouchableOpacity>
                                    <Icon name="pencil" size={25} style={styles.icon} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon name="delete" size={25} style={styles.icon} />
                                </TouchableOpacity>
                            </Right>

                        </Item>
                    </View>
                    <View style={{ paddingLeft: '8%' }}>
                        {this.renderInfo("Email: ", this.state.player.username)}
                        {this.renderInfo("Idade: ", this.state.player.dateOfBirth)}
                        {this.renderInfo("Saque: ", this.state.player.level + "/10")}
                        {this.renderInfo("Peso: ", this.state.player.weight + " kg")}
                        {this.renderInfo("Altura: ", this.state.player.height + " cm")}
                        {this.renderInfo("Telefone: ", this.state.player.phone)}
                        {this.renderInfo("Endereço: ", this.state.player.adress)}
                        {this.state.player.lastAnalyze ? this.renderInfo("Última avaliação: ", this.state.player.lastAnalyze) : this.renderInfo("Última avaliação: ", "Ainda não possui avaliações")}
                    </View>

                    <Item style={{ borderColor: 'white', paddingTop: '10%', justifyContent: 'center', alignItems: 'center', paddingLeft: '5%' }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <TouchableOpacity>
                                <Icon name="share-variant" size={25} style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="forum" size={24} style={styles.icon} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ paddingLeft: '30%' }}>
                            <Button style={{ backgroundColor: "#E07A2F", borderRadius: 24 }}>
                                <Text style={{ color: 'white' }}>AVALIAR</Text>
                            </Button>
                        </Body>
                    </Item>

                    {this.state.player.countAnalyze > 0
                        ?
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ResultByPlayer", { good: this.state.good, medium: this.state.medium, bad: this.state.bad })}>
                            <View style={{ paddingTop: '3%', paddingLeft: '5%', paddingRight: '5%', paddingTop: '10%' }}>
                                <View style={{ backgroundColor: "#F1F9FF", height: 78, borderWidth: 1, borderColor: '#269cda', alignItems: 'center', justifyContent: "center" }}>
                                    <Text style={{ fontSize: 12, color: "#269cda", padding: 3, fontWeight: "bold" }}>Ver Resultados</Text>
                                </View>

                            </View>

                        </TouchableOpacity>
                        : null
                    }

                </Content>

                <ProfileModal

                    onCreated={this.imageCreated}
                    onDeleted={this.imageDeleted}
                    existsProfileImage={this.state.existsProfileImage}
                    player={this.props.navigation.state.params.player}
                    onClose={() => this.setState({ modalVisible: false })}
                    visible={this.state.modalVisible}
                    typeUser={3}
                />

                <PhotoModal
                    uri={this.state.player.profileImage}
                    onClose={() => this.setState({ modalPhotoVisible: false })}
                    visible={this.state.modalPhotoVisible}
                />

            </Container >
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