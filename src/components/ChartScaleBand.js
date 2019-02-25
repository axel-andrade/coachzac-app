import React from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { BarChart, XAxis,LineChart, YAxis, Grid } from 'react-native-svg-charts'
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

    const data = [50, 10, 40, 95, 85, 91, 35, 53,  24, 50]

    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30

    return (
        <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
                <YAxis
                    data={data}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={data}
                        contentInset={verticalContentInset}
                        svg={{ stroke: '#269cda' }}
                    >
                        <Grid/>
                    </LineChart>
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={data}
                        formatLabel={(value, index) => index}
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    />
                </View>
            </View>
    )

};

export default ChartScaleBand;
