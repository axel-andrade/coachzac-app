import React, { Component } from 'react';
import { ListView, View, StyleSheet, TouchableOpacity, ScrollView, Alert, AsyncStorage } from 'react-native';
import { Container, Item, Thumbnail, Header, Content, Button, List, ListItem, Text, Left, Body, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const profileImage = require('../../assets/profile.png');
import ProfileModal from '../components/ProfileModal';
import PhotoModal from '../components/PhotoModal';
import PureChart from 'react-native-pure-chart';


export default class PlayerProfile extends Component {

    state = {
        player: [],
        existsProfileImage: false,
        modalVisible: false,
        fromListItem: true,
        modalPhotoVisible: false,
    };

    async componentDidMount() {

        //verificando se o componente esta vindo da list item 
        if (this.state.fromListItem) {
            //Alert.alert("Veio do list item");
            if (this.props.navigation.state.params.player.profileImage != undefined) {
                this.setState({
                    player: this.props.navigation.state.params.player,
                    existsProfileImage: true
                });

                await AsyncStorage.multiSet([
                    ['@CoachZac:player', JSON.stringify(this.props.navigation.state.params.player)],
                ]);
            }
            else {
                this.setState({
                    player: this.props.navigation.state.params.player,
                    existsProfileImage: false
                });

                await AsyncStorage.multiSet([
                    ['@CoachZac:player', JSON.stringify(this.props.navigation.state.params.player)],
                ]);
            }
        }

    };

    renderFundaments = (borderColor, color, step, nameStep) => {
        return (
            <Item style={{ borderColor: 'transparent', alignItems: 'center' }}>
                <Left style={{ paddingLeft: '3%' }}>
                    <View style={{ backgroundColor: "white", borderWidth: 1, borderColor: `${borderColor}`, width: "40%", alignItems: 'center', justifyContent: "center" }}>
                        <Text style={{ fontSize: 12, color: `${color}`, padding: 3, fontWeight: "bold" }}>{"Passos " + nameStep}</Text>
                    </View>
                    {step
                        ? <Text note style={{ fontSize: 10, paddingTop: "2%" }}>{step}</Text>
                        : <Text note style={{ fontSize: 10, paddingTop: "2%" }}>Nenhum</Text>
                    }
                </Left>
            </Item>

        );
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
                        <Text style={{ color: '#269cda', fontSize: 20, fontWeight: 'bold' }}>Perfil do Atleta</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <ScrollView>
                    <View style={{ backgroundColor: "white", height: '35%', paddingTop: '2%' }}>
                        <ListItem avatar>
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
                                <Text style={{ color: '#269cda', fontWeight: 'bold' }}>{this.state.player.name}</Text>
                                {this.renderInfo("Email: ", this.state.player.username)}
                                {this.renderInfo("Idade: ", this.state.player.dateOfBirth)}
                                {this.renderInfo("Saque: ", this.state.player.level + "/10")}
                                {this.renderInfo("Peso: ", this.state.player.weight + " kg")}
                                {this.renderInfo("Altura: ", this.state.player.height + " cm")}
                                {this.renderInfo("Telefone: ", this.state.player.phone)}
                                {this.renderInfo("Endereço: ", this.state.player.adress)}
                                {this.state.player.lastAnalyze ? this.renderInfo("Última avaliação: ", this.state.player.lastAnalyze) : this.renderInfo("Última avaliação: ", "Ainda não possui avaliações")}

                            </Body>
                            <Right>
                                <TouchableOpacity>
                                    <Icon name="pencil" size={25} style={styles.icon} />
                                </TouchableOpacity>
                            </Right>

                        </ListItem>
                    </View>

                    <View style={{ height: '20%', paddingLeft: '5%', paddingTop:"10%" }}>

                        <View style={{ alignItems: 'flex-end', paddingBottom: '20%', paddingTop: '7%', paddingRight: '5%' }}>

                            <View style={{ flexDirection: 'row' }}>
                                <Left style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity>
                                        <Icon name="email" size={25} style={styles.icon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon name="share-variant" size={25} style={styles.icon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon name="phone" size={24} style={styles.icon} />
                                    </TouchableOpacity>
                                </Left>
                                <Right>
                                    <Button style={{ backgroundColor: "#E07A2F", borderRadius: 24 }}>
                                        <Text style={{ color: 'white' }}>AVALIAR</Text>
                                    </Button>
                                </Right>
                            </View>

                        </View>

                    </View>
                    {/* Fundamentos bons ruins e medio */}

                    {this.renderFundaments('green', 'green', this.state.player.goodSteps, 'Bons')}
                    {this.renderFundaments('#FFD700', '#FFD700', this.state.player.mediumSteps, "Médios")}
                    {this.renderFundaments('red', 'red', this.state.player.badSteps, "Ruins")}



                    <View style={{ alignItems: 'center', height: '30%', justifyContent: 'center', paddingBottom: '10%' }}>

                        {this.state.player.countAnalyze > 0
                            ?
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("AnalyzesByPlayer")}>
                                <View style={{ width: '90%', height: '60%', backgroundColor: '#F1F9FF', borderColor: '#269cda', borderWidth: 0.5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>

                                    <Left style={{ paddingLeft: 10 }}>
                                        <Text style={{ color: '#269cda' }}>Avaliações</Text>
                                    </Left>
                                    <Right style={{ paddingRight: 10 }}>
                                        <Text style={{ color: '#269cda' }}>{"+" + this.state.player.countAnalyze}</Text>
                                    </Right>
                                </View>
                            </TouchableOpacity>
                            : null
                        }
                    </View>
            
                </ScrollView>

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
        color: 'black'
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