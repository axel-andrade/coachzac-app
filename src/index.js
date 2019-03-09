import React, { Component } from 'react';
import {View, Text, Button} from 'react-native';
import {createAppContainer,createStackNavigator} from 'react-navigation';

import RecoverPassword from './pages/RecoverPassword';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Player from './pages/Player';
import Home from './pages/Home';
import PlayerProfile from './pages/PlayerProfile';
import ResultDetail from './pages/ResultDetail';
import AnalyzesByPlayer from './pages/AnalyzesByPlayer';
import ResultByPlayer from './pages/ResultByPlayer';
import Main from './pages/Main';
import Account from './pages/Account';
import AccountDetail from './pages/AccountDetail';
import CreatePlayer from './pages/CreatePlayer';
import InitAnalyze from './pages/InitAnalyze';
import PlayerForAnalyze from './pages/PlayerForAnalyze';
import AnalyzeWithoutVideo from './pages/AnalyzeWithoutVideo';
import NewAnalyze from  './pages/NewAnalyze';
import UpdatePlayer from './pages/UpdatePlayer';
import UpdateUser from './pages/UpdateUser';
import UpdatePassword from './pages/UpdatePassword';
import UpdateAnalyze from './pages/UpdateAnalyze';
import SliderExample from './tests/examples/SliderExample';

//export default createAppContainer(TabNavigator);
const AppNavigator = createStackNavigator({

    'Main': {  
        screen: Login,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },
    'Login': {  
        screen: Login,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },
    'Account': {  
        screen: Account,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },
    'AccountDetail': {  
        screen: AccountDetail,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },
    'InitAnalyze': {  
        screen: InitAnalyze,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },
    'NewAnalyze': {  
        screen: NewAnalyze,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },
    'PlayerProfile': {
        screen: PlayerProfile,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }

    },
    'UpdatePlayer': {
        screen: UpdatePlayer,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },
    'UpdateUser': {
        screen: UpdateUser,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },
    'UpdatePassword': {
        screen: UpdatePassword,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },
    'UpdateAnalyze': {
        screen: UpdateAnalyze,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },
    'PlayerForAnalyze': {
        screen: PlayerForAnalyze,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }

    },
    'AnalyzeWithoutVideo': {
        screen: AnalyzeWithoutVideo,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }

    },
    'ResultDetail': {
        screen: ResultDetail,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },
    'AnalyzesByPlayer': {
        screen: AnalyzesByPlayer,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },
    'ResultByPlayer': {
        screen: ResultByPlayer,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },
    'Home': {
        screen: Home,//Home,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },

    'SignUp': {
        screen: SignUp,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },

    'RecoverPassword': {
        screen: RecoverPassword,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },

    'CreatePlayer': {
        screen: CreatePlayer,
        navigationOptions: ({ navigation }) => {
            return ({ header: null });
        }
    },

},
    {
        defaultNavigationOptions: {
            title: 'Teste',
            headerTintColor: '#269cda',
            headerStyle: {
                backgroundColor: 'white',
            }, headerTitleStyle: {
                color: '#269cda',
                fontWeight: 'normal'
            }
        }


    });

// // const AppNavigator  = createStackNavigator({
// //     Login: Login, 
// //     SignUp: SignUp,
// //     RecoverPassword: RecoverPassword,
// //     Analyze: Analyze,
// //     Home: Home,
// //     Player: Player,
// //     PlayerProfile: PlayerProfile

// // }, {initialRouteName: 'Login'})

export default createAppContainer(AppNavigator);

// const TabNavigator = createBottomTabNavigator({
//     Player: {
//         screen: Player,
//         navigationOptions:  {
//             tabBarIcon: ({tintColor}) => (<Icon name="account-multiple" size={30}  color={tintColor}/>),
//         }
//     },
//     Analyze:{
//         screen: Teste,
//         navigationOptions:  {
//             tabBarIcon: ({tintColor}) => (<Icon name="clipboard-pulse-outline" size={30} color={tintColor}/>)
//         }
//     },
//     Init:{
//         screen: Teste,
//         navigationOptions:  {
//             tabBarIcon: ({tintColor}) => (<Icon name="tennis" size={30} color={tintColor}/>)
//         }
//     },
//     Training:{
//         screen: Teste,
//         navigationOptions:  {
//             tabBarIcon: ({tintColor}) => (<Icon name="calendar-clock" size={30} color={tintColor}/>)
//         }
//     },
//     Account:{
//         screen: Account,
//         navigationOptions:  {
//             tabBarIcon: ({tintColor}) => (<Icon name="settings" size={30} color={tintColor}/>)
//         }
//     },
// },{ 
//     initialRouteName: "Player",
//     swipeEnabled:true,
//     navigationOptions: ({ navigation }) => ({   
       
//     }),
//     lazy: false,
//     tabBarOptions: {
//         showLabel: false,
//         activeTintColor:  '#E07A2F',
//         activeBackgroundColor: '#F1F9FF',
//         inactiveBackgroundColor:'white',
//         inactiveTintColor: '#269cda'
//     }
       
// }
// );
