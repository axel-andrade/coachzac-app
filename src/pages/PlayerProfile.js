import React, { Component } from 'react';
import { ListView, View, StyleSheet, TouchableOpacity, ScrollView, Alert, AsyncStorage } from 'react-native';
import { Container, Item, Thumbnail, Header, Content, Button, List, ListItem, Text, Left, Body, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const profileImage = require('../../assets/profile.png');
import ProfileModal from '../components/ProfileModal';
import PhotoModal from '../components/PhotoModal';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

export default class PlayerProfile extends Component {

    state = {
        player: this.props.navigation.state.params.player,
        existsProfileImage: false,
        modalVisible: false,
        fromListItem: true,
        modalPhotoVisible: false,
        good: [],
        medium: [],
        bad: [],
        from: this.props.navigation.state.params.from

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
            <View style={{ backgroundColor: '#F1F9FF', padding: '2%', borderWidth: 0.5, borderColor: 'white' }}>
                <Text note style={styles.note}>
                    <Text note style={[styles.note, styles.noteBold]}>{name}</Text>
                    {state}
                </Text>
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



                <Header style={{ backgroundColor: '#F1F9FF', alignItems: 'center' }}>

                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-left" size={22.5} color='#269cda' />
                    </Button>

                    <Body>
                    </Body>

                    <Button transparent onPress={() => this.props.navigation.navigate("UpdatePlayer", {
                         player: this.state.player ,
                         onUpdate: (params) => this.setState(params) 
                     })}>
                        <Icon name="pencil" size={22.5} color='#269cda' />
                    </Button>

                </Header>

                <View style={{ backgroundColor: "#F1F9FF", height: '10%', width: '100%' }}>
                </View>
                <View style={{ backgroundColor: "white", height: '10%', width: '100%', paddingRight: '5%' }}>
                    {this.state.player.countAnalyze > 0 ?
                        <Item style={{ borderColor: 'white' }}>
                            <Right>
                                <Button transparent onPress={() => this.props.navigation.navigate("ResultByPlayer", { good: this.state.good, medium: this.state.medium, bad: this.state.bad })}>
                                    <Text uppercase={false} style={{ color: '#E07A2F', fontSize: 12 }}>Ver Resultados</Text>
                                </Button>
                            </Right>
                        </Item>
                        : null}
                </View>





                <Content>
                    <View style={{ paddingLeft: '5%', paddingRight: '5%', borderRadius: 10 }}>
                        {this.renderInfo("Nome: ", this.state.player.name)}
                        {this.renderInfo("Email: ", this.state.player.username)}
                        {this.renderInfo("Idade: ", this.state.player.dateOfBirth)}
                        {this.renderInfo("Nível: ", parseFloat(this.state.player.level).toFixed(1) + "/10")}
                        {this.renderInfo("Peso: ", this.state.player.weight + " kg")}
                        {this.renderInfo("Altura: ", this.state.player.height + " cm")}
                        {this.renderInfo("Telefone: ", this.state.player.phone)}
                        {this.renderInfo("Endereço: ", this.state.player.adress)}
                        {this.state.player.lastAnalyze ? this.renderInfo("Última avaliação: ", this.state.player.lastAnalyze) : this.renderInfo("Última avaliação: ", "Ainda não possui avaliações")}
                    </View>


                    <Item style={{ borderColor: 'white', paddingTop: '10%', justifyContent: 'center', alignItems: 'center', paddingLeft: '5%', paddingRight: '5%' }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <TouchableOpacity>
                                <Icon name="email" size={25} style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="share-variant" size={25} style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="forum" size={24} style={styles.icon} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ paddingLeft: '30%', flexDirection: 'column' }}>
                            <Button bordered block style={{ width: '100%',borderColor:"#E07A2F"}} onPress={()=>this.props.navigation.navigate("InitAnalyze", {player: this.state.player})}>
                                <Text uppercase={false} style={{ color: '#E07A2F' }}>Avaliar</Text>
                            </Button>
                        </Body>
                    </Item>
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

                <View style={{ alignItems: 'center', backgroundColor: 'green', position: "absolute", backgroundColor: 'transparent', top: '12%', left: 20 }}>

                    {this.state.existsProfileImage
                        ? <TouchableOpacity onPress={() => this.setState({ modalVisible: true })} onLongPress={() => this.setState({ modalPhotoVisible: true })}>
                            <View style={{ borderColor: '#white', borderWidth: 3, borderRadius: 50 }}>
                                <Thumbnail large source={{ uri: this.state.player.profileImage }} />
                            </View>
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
                            <View style={{ borderColor: 'white', borderWidth: 3, borderRadius: 50 }}>
                                <Thumbnail large source={profileImage} />
                            </View>
                        </TouchableOpacity>

                    }

                </View>

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
