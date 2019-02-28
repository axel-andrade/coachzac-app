import React, { Component } from 'react';
import { ListView, View, StyleSheet, TouchableOpacity, ScrollView, Alert, AsyncStorage } from 'react-native';
import { Container, Item, Thumbnail, Header, Content, CheckBox, Button, List, ListItem, Text, Left, Body, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const profileImage = require('../../assets/profile.png');
import SelectVideoModal from '../components/SelectVideoModal';
import { NavigationActions, StackActions } from 'react-navigation';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

export default class InitAnalyze extends Component {


    state = {
        player: [],
        existsProfileImage: false,
        showSteps: false,
        steps: [true, true, true, true, true, true, true, true],
        modalVisible: false,
        isValid: true
    };
    async componentDidMount() {

        let existsProfileImage;
        //Alert.alert("Veio do list item");
        if (this.props.navigation.state.params.player.profileImage != undefined)
            existsProfileImage = true;
        else
            existsProfileImage = false;
        this.setState({
            player: this.props.navigation.state.params.player,
            existsProfileImage: existsProfileImage,
            steps:[true, true, true, true, true, true, true, true]
        });


    };


    renderInfo = (name, state) => {
        return (
            <Text note style={styles.note}>
                <Text note style={styles.step}>{name}</Text>
                {state}
            </Text>
        );
    };

    changeSteps(pos) {
        let data = this.state.steps;
        data[pos] = !data[pos];
        
        let isValid = this.isValid(data);
        this.setState({ steps: data, isValid: isValid });
    };
    clearSteps() {
        this.setState({ steps: [false, false, false, false, false, false, false, false], isValid: false });
    }
    renderSteps = (step, pos) => {
        return (

            <Item style={{ borderColor: "#F1F9FF" ,paddingTop:"3%"}}>
                <TouchableOpacity onPress={() => this.changeSteps(pos)}>
                    <View style={{ paddingTop: '2%', paddingBottom: '2%' }} ><Text style={styles.step}>{step}</Text></View>
                </TouchableOpacity>
                <Right style={{ paddingRight: '4%', justifyContent: "center" }}>
                    <CheckBox onPress={() => this.changeSteps(pos)} color={'#269cda'} checked={this.state.steps[pos]} />
                </Right>
            </Item>

        );
    };

    isValid(data) {
      
        let isValid;
        for (let i = 0; i < data.length; i++) {
            if (data[i]==true) {
                isValid = true;
                break;
            }
            else
                isValid = false;
        }
        //alert(data);
        return isValid;
    };

    openModal(){
        //this.props.navigation.state.params.onRestart();
        this.setState({ modalVisible: true });
    };

    render() {

        return (

            <Container>
                <Header style={{ backgroundColor: 'white' }}>

                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-left" size={22.5} color='#269cda' />
                    </Button>

                    <Body style={{ paddingLeft: '5%' }}>
                    <Title style={{ color: '#269cda' }}>Iniciar Avaliação</Title>

                    </Body>

                    <Button transparent onPress={() => this.props.navigation.dispatch(resetAction)}>
                        <Icon name="home" size={22.5} color='#E07A2F' />
                    </Button>

                </Header>
                <Content Padder>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingLeft: '5%', paddingTop: '5%' }}>
                            {this.state.existsProfileImage
                                ? <TouchableOpacity onPress={() => this.setState({ modalVisible: true })} onLongPress={() => this.setState({ modalPhotoVisible: true })}>
                                    <Thumbnail source={{ uri: this.state.player.profileImage }} />
                                </TouchableOpacity>
                                : <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
                                    <Thumbnail source={profileImage} />
                                </TouchableOpacity>
                            }
                        </View>

                        <View style={{ paddingLeft: '5%', paddingTop: '2%' }}>
                            {this.renderInfo("Name: ", this.state.player.name)}
                            {this.renderInfo("Idade: ", this.state.player.dateOfBirth)}
                            {this.renderInfo("Saque: ", parseFloat(this.state.player.level).toFixed(1) + "/10")}
                            {this.renderInfo("Peso: ", this.state.player.weight + " kg")}
                            {this.renderInfo("Altura: ", this.state.player.height + " cm")}
                            {this.renderInfo("Fundamento: ", "Saque")}
                        </View>
                    </View>
                    <Content>
                        <ListItem style={{ borderColor: 'white' }}>

                            <Button bordered style={{borderColor:'#F1F9FF'}} onPress={() => this.setState({ showSteps: !this.state.showSteps })}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Left style={{ paddingLeft: '2%' }}>
                                        <Text style={{ color: '#E07A2F', fontSize: 16, fontWeight: 'bold' }}>Passos</Text>
                                    </Left>
                                    <Right style={{ paddingRight: '2%' }}>
                                        {this.state.showSteps
                                            ? <Icon name="chevron-up" size={30} color='#E07A2F' />
                                            : <Icon name="chevron-down" size={30} color='#E07A2F' />
                                        }
                                    </Right>
                                </View>
                            </Button>

                        </ListItem >

                        {this.state.showSteps
                            ? <View style={{ paddingLeft: '6%', paddingRight: '6%' }}>
                                {this.renderSteps("Posicionamento do Pés", 0)}
                                {this.renderSteps("Posição inicial dos braços e das mãos", 1)}
                                {this.renderSteps("Braço direito sobe antes do esquerdo ", 2)}
                                {this.renderSteps("Elevação da Bola", 3)}
                                {this.renderSteps("Altura da Bola", 4)}
                                {this.renderSteps("Braço esquerdo estendido ", 5)}
                                {this.renderSteps("Posição e movimentação dos pés ", 6)}
                                {this.renderSteps("Flexionamento dos joelhos ", 7)}
                                <TouchableOpacity onPress={() => this.clearSteps()}>
                                    <View style={{ paddingTop: '5%' }}>
                                        <Text style={{ fontSize: 14, color: "#E07A2F" }}>Limpar</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            : null
                        }



                    </Content>
                </Content>
                <View style={{ padding: '5%' }}>
                {this.state.isValid
                    ? <Button block style={{ backgroundColor: '#269cda' }} onPress={() => this.openModal()}>
                        <Text>AVANÇAR</Text>
                    </Button>

                    : <Button disabled block style={{ backgroundColor: 'gray' }}>
                        <Text>AVANÇAR</Text>
                    </Button>
                }
                </View>

                <SelectVideoModal
                    navigation={this.props.navigation}
                    onClose={() => {this.setState({ showSteps: false,modalVisible: false, steps: [true, true, true, true, true, true, true, true]})}}
                    visible={this.state.modalVisible}
                    steps={this.state.steps}
                    playerId={this.state.player.objectId}
                    playerName={this.state.player.name}
                    
                />

            </Container >

        );
    }
}

const styles = StyleSheet.create({
    note: {
        fontSize: 14,
    },
    noteBold: {
        fontWeight: 'bold',
        color: '#269cda'
    },
    step: {
        fontSize: 14,
        color: '#555555'
    }
});
