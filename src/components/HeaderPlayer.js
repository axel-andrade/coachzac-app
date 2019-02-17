import React, { Component } from 'react';
import { ListView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Item, Thumbnail, Header, Content, Button, List, ListItem, Text, Left, Body, Right, Title, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HeaderPlayer extends Component {

    state = {
        searchBar: true,
    };

    render() {
        return (
            <Header style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderColor: 'white', flexDirection: 'row' }}>

                {this.state.searchBar
                    ? <Item style={{ justifyContent: 'center', alignItems: 'center', borderColor: 'transparent' }}>
                        <Left>

                            <Text style={{ color: '#269cda', fontSize: 20 , fontWeight:'bold'}}>{this.props.nameHeader}</Text>

                        </Left>

                        <TouchableOpacity onPress={() => this.setState({ searchBar: false })}>
                            <Icon style={{ paddingRight: '5%' }} name="magnify" size={22.5} color='#269cda' />
                        </TouchableOpacity>


                        <TouchableOpacity>
                            <Icon name="tune" size={22.5} color='#269cda' />
                        </TouchableOpacity>

                    </Item>

                    : <Item style={{ justifyContent: 'center', borderColor: 'transparent' }}>
                        <Left>

                            <TouchableOpacity onPress={() => this.setState({ searchBar: true })}>
                                <Icon name="arrow-left" size={22.5} color='#269cda' />
                            </TouchableOpacity>

                        </Left>

                        <View style={styles.buttonEnviar}>

                            <Input
                                placeholder='Buscar atleta'
                                style={{ fontFamily: 'Exo Medium', color: '#269cda' }}
                                placeholderTextColor='#269cda'
                                style={{ alignItems: 'flex-start', paddingTop: 2, paddingBottom: 4, paddingLeft: 15, justifyContent: 'center' }}
                                //value={this.state.busca}
                                //onChangeText={textoDig => this.setState({ busca: textoDig })}
                            />
                        </View>
            

                    </Item>
                }


            </Header>
        );
    };

}

// const HeaderPlayer = (props) => {
//     const { nameHeader } = props;

//     return (
//         <Header style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderColor: 'white', flexDirection: 'row' }}>
//             <Item style={{justifyContent:'center',alignItems:'center',borderColor:'transparent'}}>
//                 <Left>
//                 <Text style={{ color: '#269cda', fontSize: 20 }}>{nameHeader}</Text>
//                 </Left>

//                         <TouchableOpacity>
//                             <Icon style={{paddingRight:'5%'}}name="magnify" size={22.5} color='#269cda' />
//                         </TouchableOpacity>


//                         <TouchableOpacity>
//                             <Icon name="tune" size={22.5} color='#269cda' />
//                         </TouchableOpacity>

//             </Item>


//         </Header>
//     );


// };

const styles = StyleSheet.create({

    buttonEnviar: {
        borderWidth: 0.5,
        borderColor: '#269cda',
        width: '90%', height: '60%',
        borderRadius: 23,
        backgroundColor: 'transparent',
        paddingRight:'10%'
    },
});

//export default HeaderPlayer;

// const HeaderPlayer = (props) => (

//     <Header style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderColor: 'white', flexDirection: 'row' }}>
//             <View style={{ width: '10%', alignItems: 'center', }}>
//                 <Icon name="magnify" size={22.5} color='#269cda' />
//             </View>
//             <View transparent style={styles.buttonEnviar}>

//                 <Input
//                     placeholder='Buscar atleta'
//                     style={{ fontFamily: 'Exo Medium', color: '#269cda'}}
//                     placeholderTextColor='#269cda'
//                     style={{alignItems:'flex-start',paddingTop:2,paddingBottom:4, paddingLeft:15,justifyContent:'center'}}
//                 //value={this.state.busca}
//                 //onChangeText={textoDig => this.setState({ busca: textoDig })}
//                 />

//             </View>

//             <View style={{ width: '10%', alignItems: 'flex-end' }}>
//                 <Icon name="tune" size={22.5} color='#269cda' />
//             </View>
//         </Header>


// );

// const styles = StyleSheet.create({

//     buttonEnviar: {
//         borderWidth: 1,
//         borderColor: '#269cda',
//         alignItems: 'flex-start',
//         width: '80%', height: '60%',
//         borderRadius: 23,
//         backgroundColor: 'transparent'
//     },
// });

// export default HeaderPlayer;