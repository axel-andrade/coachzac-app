import React from 'react';
import { View, ScrollView,FlatList } from 'react-native';
import { BarChart, XAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
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


const ChartScaleBand = props => {

    const {array} = props;
    const data = [ 14, 80, 100, 55 ];

    return (

        <View style={{ height: 200}}>
                <BarChart
                    style={{ flex: 1 }}
                    data={data}
                    gridMin={0}
                    svg={{ fill: 'rgb(134, 65, 244)' }}
                />
                <XAxis
                    style={{ marginTop: 10 }}
                    data={ data }
                    scale={scale.scaleBand}
                    formatLabel={ (value, index) => index }
                    labelStyle={ { color: 'black' } }
                />
            </View>


    );

};

export default ChartScaleBand;
