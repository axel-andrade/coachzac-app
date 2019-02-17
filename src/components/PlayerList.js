import React from 'react';
import { View, ScrollView,FlatList } from 'react-native';

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

import PlayerListItem from '../components/PlayerListItem';

const PlayerList = props => {

    const {players, onPress, onLongPress, onFavorited} = props;

    return (

        <FlatList
            data={players}
            renderItem={({item})=>(
                <PlayerListItem 
                    player={item}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    onFavorited={onFavorited}
                />    
        )}
        keyExtractor={item => item.objectId}/>

    );

};

export default PlayerList;

//List normal
// const PlayerList = props => {

//     const {players, onPress} = props;
 
//     const itens= players.map(player => {
//         return <PlayerListItem 
//                     key={player.objectId}
//                     player={player}
//                     onPress={onPress}
//                 />
//     });

//     return (

//         <ScrollView>
//             {itens}
//         </ScrollView>

//     );

// };

// export default PlayerList;