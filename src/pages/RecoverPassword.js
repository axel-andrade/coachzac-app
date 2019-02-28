import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
    Left,
    Right,
    Footer
} from "native-base";

export default class RecoverPassword extends Component {
    state = {
        email: "",
    };
    render() {

        let { email } = this.state;
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-left" size={22.5} color='#269cda' />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: "flex-start" }}>
                        <Text style={{ color: '#269cda', fontSize: 20, fontWeight: 'bold' }}>Recuperar Senha</Text>
                    </Body>

                </Header>
                <Content>

                    <View style={{ padding: '5%' }}>
                        <TextField
                            label="Email"
                            textColor='#555555'
                            labelHeight={20}
                            tintColor='#E07A2F'
                            baseColor='#269cda'
                            value={email}
                            onChangeText={(email) => this.setState({ email })}
                        />

                    </View>

                </Content>

                <View style={{ padding: '5%' }}>
                    <Button block style={{ backgroundColor: '#269cda' }} >
                        <Text uppercase={false}>Enviar</Text>
                    </Button>
                </View>


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
        width: 115, height: 49,
        backgroundColor: '#E07A2F',
        borderRadius: 23,
    }
});
