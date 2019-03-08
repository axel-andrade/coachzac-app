import React, { Component } from 'react';
import { ListView, View, StyleSheet, TouchableOpacity, ScrollView, Alert, AsyncStorage } from 'react-native';
import { Container, Item, Thumbnail, Header, Content, Button, List, ListItem, Text, Left, Body, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const profileImageDefault = require('../../assets/profile.png');
import ProfileModal from '../components/ProfileModal';
import PhotoModal from '../components/PhotoModal';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { NavigationActions, StackActions } from 'react-navigation';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home', params: { page: 1 } })],

});


export default class PlayerProfile extends Component {

    state = {
        player: [],
        existsProfileImage: false,
        modalVisible: false,
        fromListItem: true,
        modalPhotoVisible: false,
        firstName: ""
    };

    async componentDidMount() {

        let existsProfileImage;
        let firstName = this.props.navigation.state.params.player.name.split(" ");
        if (this.props.navigation.state.params.player.profileImage != undefined)
            existsProfileImage = true;
        else
            existsProfileImage = false;

        this.setState({
            //player: this.props.navigation.state.params.player,
            existsProfileImage: existsProfileImage,
            firstName: firstName
        });
        await AsyncStorage.multiSet([
            ['@CoachZac:player', JSON.stringify(this.props.navigation.state.params.player)],
        ]);


    };

    renderInfo = (name, state) => {
        return (
            <View style={{ backgroundColor: 'white', padding: '2%', borderWidth: 1, borderColor: '#F1F9FF' }}>
                <Text note style={[styles.note, styles.noteBold]}>{name}</Text>
                <Text note style={styles.note}>{state}</Text>

            </View>
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


    calculateAge(dateOfBirth, today) {
        return Math.floor(Math.ceil(Math.abs(dateOfBirth.getTime() - today.getTime()) / (1000 * 3600 * 24)) / 365.25);
    };

    renderDate(date) {
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }


    render() {

        let { name, username, dateOfBirth, level, weight, height, phone, adress, lastAnalyze, countAnalyze, goodSteps, mediumSteps, badSteps, profileImage } = this.props.navigation.state.params.player;

        return (
            <Container>
                <Header style={{ backgroundColor: 'white', alignItems: 'center' }}>

                    <Button transparent onPress={() => this.props.navigation.dispatch(resetAction)}>
                        <Icon name="arrow-left" size={22.5} color='#269cda' />
                    </Button>

                    <Body>

                    </Body>

                    <Right>
                        <Icon name="dots-vertical" size={22.5} color='#269cda' />
                    </Right>
                </Header>

                <Content>

                    <Item style={{ borderColor: 'white', paddingTop: '10%' }}>
                        <Left style={{ alignItems: 'center' }}>

                            {this.state.existsProfileImage

                                ? <TouchableOpacity onPress={() => this.setState({ modalVisible: true })} onLongPress={() => this.setState({ modalPhotoVisible: true })}>
                                    <View style={{ borderColor: '#F1F9FF', borderWidth: 3, borderRadius: 50 }}>
                                        <Thumbnail large source={{ uri: profileImage }} />
                                    </View>
                                </TouchableOpacity>

                                : <TouchableOpacity onPress={() => this.setState({ modalVisible: true })} >
                                    <View style={{ borderColor: '#F1F9FF', borderWidth: 3, borderRadius: 50 }}>
                                        <Thumbnail large source={profileImageDefault} />
                                    </View>
                                </TouchableOpacity>
                            }

                        </Left>
                        <Body style={{ alignItems: 'flex-start' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: "#269cda" }}>{this.state.firstName[0]}</Text>
                            <Text style={{ fontSize: 12, color: '#269cda' }}>Minas Tênis</Text>
                        </Body>
                        <Right style={{ alignItems: 'center' }}>
                            <TouchableOpacity>
                                <View style={{ padding: 10, backgroundColor: '#F1F9FF', borderRadius: 50 }}>
                                    <Icon name="pencil" size={30} style={{ color: '#269cda' }} onPress={() => this.props.navigation.navigate("UpdatePlayer", {
                                        player: this.props.navigation.state.params.player
                                    })} />
                                </View>
                            </TouchableOpacity>
                        </Right>
                    </Item>



                    <Item style={{ borderColor: 'white', paddingTop: '10%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: '5%', paddingRight: '5%' }}>
                        <Left style={{ flexDirection: 'row' }}>

                            <Icon name="email" size={25} style={styles.icon} />
                            <Icon name="share-variant" size={25} style={styles.icon} />
                            <Icon name="forum" size={24} style={styles.icon} />

                        </Left>
                        <Body style={{ paddingLeft: '30%', flexDirection: 'column' }}>
                            <Button rounded bordered block style={{ width: '100%', borderColor: "#E07A2F" }} onPress={() => this.props.navigation.push("InitAnalyze", { player: this.props.navigation.state.params.player })}>
                                <Text uppercase={false} style={{ color: '#E07A2F' }}>Avaliar</Text>
                            </Button>
                        </Body>
                    </Item>

                    <View style={{ paddingTop: '5%', paddingBottom: '5%', paddingLeft: '5%', paddingRight: '5%', borderRadius: 10 }}>
                        {this.renderInfo("Nome Completo: ", name)}
                        {this.renderInfo("Email: ", username)}
                        {this.renderInfo("Idade: ", this.calculateAge(new Date(dateOfBirth), new Date()) + " anos")}
                        {this.renderInfo("Nível: ", parseFloat(level).toFixed(1) + "/10")}
                        {this.renderInfo("Peso: ", weight + " kg")}
                        {this.renderInfo("Altura: ", height + " cm")}
                        {this.renderInfo("Telefone: ", phone)}
                        {this.renderInfo("Endereço: ", adress)}
                        {lastAnalyze ? this.renderInfo("Última avaliação: ", this.renderDate(new Date(lastAnalyze))) : this.renderInfo("Última avaliação: ", "Ainda não possui avaliações")}
                    </View>

                    {countAnalyze > 0
                        ? <View style={{ padding: '5%' }}>
                            <Button block style={{ backgroundColor: '#269cda' }} onPress={() => this.props.navigation.navigate("ResultByPlayer", { good: goodSteps, medium: mediumSteps, bad: badSteps })}>
                                <Text style={{ color: "white" }}>Resultados</Text>
                            </Button>
                        </View>
                        : null
                    }

                    <Text>{dateOfBirth}</Text>


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
        fontSize: 14,
        color: '#555555'
    },
    noteBold: {
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


// {this.state.player.countAnalyze > 0
//     ?
//     <TouchableOpacity onPress={() => this.props.navigation.navigate("ResultByPlayer", { good: this.state.good, medium: this.state.medium, bad: this.state.bad })}>
//         <View style={{ paddingTop: '3%', paddingLeft: '5%', paddingRight: '5%', paddingTop: '10%' }}>
//             <View style={{ backgroundColor: "#F1F9FF", height: 78, borderWidth: 1, borderColor: '#269cda', alignItems: 'center', justifyContent: "center" }}>
//                 <Text style={{ fontSize: 12, color: "#269cda", padding: 3, fontWeight: "bold" }}>Ver Resultados</Text>
//             </View>

//         </View>

//     </TouchableOpacity>
//     : null
// }
