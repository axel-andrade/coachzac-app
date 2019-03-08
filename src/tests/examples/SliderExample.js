import React, { Component } from "react";
import { View, Text, AsyncStorage, Slider} from "react-native";

export default class SliderExample extends Component {


    render() {

        return (
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTouchSize={{ width: 50, height: 40 }}
            />
        )
    }

}