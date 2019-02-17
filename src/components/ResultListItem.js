import React from 'react';
import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native';

import {
    List,
    ListItem,
    Left,
    Thumbnail,
    Right,
    Body,
    Text,
    Item
} from 'native-base';

const profileImage = require('../../assets/profile.png');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    note: {
        fontSize: 12,
    },
    noteBold: {
        color: "black",
    }
});

const ResultListItem = props => {

    const { analyze, onPress} = props;
    return (

        <ListItem avatar>
            <Left style={{ justifyContent: 'center' }}>

                {analyze.player.profileImage
                    ? <TouchableOpacity onPress={() => onPress({analyze})} >
                        <Thumbnail small source={{ uri: analyze.player.profileImage }} />
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={() => onPress({analyze})}>
                        <Thumbnail small source={profileImage} />
                    </TouchableOpacity>
                }
              
            </Left>

        <Body>
            <TouchableOpacity onPress={() => onPress({analyze})}>
                <Text style={{ color: '#269cda', fontWeight: 'bold' }}>{analyze.player.name}</Text>
                <Text note style={styles.note}>{analyze.fundament.name}</Text>
                <Text note style={styles.note}>{analyze.createdAt.iso}</Text>
            </TouchableOpacity>
        </Body>

        <Right style={{justifyContent: 'center', alignItems:'center'}}>
        <Text note style={styles.note}>Nota: </Text>
        <Text style={{ color: '#E07A2F', fontWeight: 'bold',fontSize:16 }}>{analyze.average} </Text>
               
        </Right>

       

        </ListItem >


    );

};

export default ResultListItem;
