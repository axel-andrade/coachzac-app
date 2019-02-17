import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
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
    Icon,
    Footer
} from "native-base";

export default class RecoverPassword extends Component {

    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>
            
                <Content padder style={{ paddingTop: '10%' }}>
                    <Form>
                        <Item style={{ borderColor: '#269cda' }}>

                            <Input
                                placeholder='Email'
                                style={{ fontFamily: 'Exo Medium', color: '#269cda' }}
                                placeholderTextColor='#269cda'
                            //value={this.state.busca}
                            //onChangeText={textoDig => this.setState({ busca: textoDig })}
                            />
                        </Item>
                    </Form>



                </Content>

                <Container>
                <View style={{alignItems: 'flex-end', paddingBottom: '30%', paddingRight: '5%' }}>

                    <TouchableOpacity>
                        <View style={styles.buttonEnviar}>

                            <Text style={{ fontFamily: 'Exo Bold', color: 'white' }}>Enviar</Text>

                        </View>
                    </TouchableOpacity>
                </View>
                </Container>

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
