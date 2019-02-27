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
    Item,
    Button
} from 'native-base';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    note: {
        fontSize: 12,
    },
    noteBold: {
        color: "black",
    }
});

const profileImage = require('../../assets/profile.png');
import PhotoModal from '../components/PhotoModal';

const PlayerListItem = props => {

    const { player, onPress, onLongPress, onFavorited, type} = props;
    var list;
    if (type != 2) {
        list = <ListItem avatar>

            <Left style={{ justifyContent: 'center' }}>

                {player.profileImage
                    ? <TouchableOpacity onPress={() => onPress({ player })} onLongPress={() => onLongPress(player.profileImage)}>
                        <Thumbnail small source={{ uri: player.profileImage }} />
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={() => onPress({ player })}>
                        <Thumbnail small source={profileImage} />
                    </TouchableOpacity>
                }

            </Left>

            <Body>
                <TouchableOpacity onPress={() => onPress({ player })}>
                    <Text style={{ color: '#269cda', fontWeight: 'bold' }}>{player.name}</Text>
                    <Text note style={styles.note}>{player.dateOfBirth}</Text>
                    <Text note style={styles.note}>{parseFloat(player.level).toFixed(1)}</Text>
                </TouchableOpacity>
            </Body>

            <Right style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => onFavorited({ player })}>
                    <Icon name="star-outline" size={27} style={{ color: 'gray'/*'#E07A2F' */ }} />
                </TouchableOpacity>
            </Right>
        </ListItem >
    }
    else {
        list = <ListItem >
            
                <Button small transparent onPress={() => onPress({ player: player }) }>
                <View style={{ flexDirection: 'row' }}>
                    <Left>
                        <Text style={{ color: '#269cda', fontWeight: 'bold' }}>{player.name}</Text>
                    </Left>
                    <Icon name="chevron-right" size={30} color='#E07A2F' />
                </View>
                </Button>
        
        </ListItem >
    }
    return (list);

};

export default PlayerListItem;

// const PlayerListItem = props => {

//     const { player, onPress } = props;
//     return (
//         <TouchableOpacity onPress={() => onPress({player})}>
//             <View style={{flexDirection:'row',paddingTop:'2%'}}>

//                     <View style={{alignItems:'center',justifyContent:'center',paddingLeft:'5%'}}>
//                     <Thumbnail small source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbJDm5z35vl6f87iE3yUlXtpLqMgStaFAsFIRhGuwsh3NTt-jquA' }} />
//                     </View>
//                     <Body style={{alignItems:'flex-start',paddingLeft:'5%'}}>
//                         <Text  style={{color:'#269cda'}}>{player.name}</Text>
//                         <Text note style={styles.note}>
//                             <Text note style={[styles.note,styles.noteBold]}>
//                             {"Idade: "} 
//                             </Text>
//                             {player.dateOfBirth}
//                         </Text>
//                         <Text note style={styles.note}>
//                             <Text note style={[styles.note,styles.noteBold]}>
//                             {"Nível: "} 
//                             </Text>
//                             {player.level+" estrelas"}
//                         </Text>

//                     </Body>
//                     <View style={{alignItems:'center',justifyContent:'center',paddingRight:'5%'}}>
//                     <Icon name="heart-outline" size={25} />
//                     </View>

//             </View>
//         </TouchableOpacity>

//     );

// };

// export default PlayerListItem;