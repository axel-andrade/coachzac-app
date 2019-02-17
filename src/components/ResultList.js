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

import ResultListItem from '../components/ResultListItem';

const ResultList = props => {

    const {analyzes, onPress} = props;

    return (

        <FlatList
            data={analyzes}
            renderItem={({item})=>(
                <ResultListItem 
                    analyze={item}
                    onPress={onPress}
                />    
        )}
        keyExtractor={item => item.objectId}/>

    );

};

export default ResultList;
