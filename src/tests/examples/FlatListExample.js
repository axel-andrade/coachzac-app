import React, { Component } from "react";
import { View, Text, FlatList, AsyncStorage } from "react-native";
import { List, ListItem } from "react-native-elements";

export default class FlatListExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            players: [],
        };
    }

    async componentDidMount() {
        let players = JSON.parse(await AsyncStorage.getItem('@CoachZac:players'));
        this.setState({ players: players })
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({ loading: true });
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.results : [...this.state.data, ...res.results],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };



    keyExtractor = (item, index) => index

    renderItem = ({ item }) => (
        <ListItem
            title={item.name}
            subtitle={item.subtitle}
            leftAvatar={{
                source: item.avatar_url && { uri: item.avatar_url },
                title: item.name[0]
            }}
        />
    )

    render() {
        const list = [
            {
                name: 'Amy Farha',
                subtitle: 'Vice President'
            },
            {
                name: 'Chris Jackson',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Vice Chairman'
            },
        ]
        return (
            <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.dataSource}
                renderItem={this.renderItem}
            />
        )
    }

}