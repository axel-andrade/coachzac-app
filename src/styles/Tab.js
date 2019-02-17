import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,flexDirection: 'column'
    },
    containerInterno:  {
        justifyContent: 'center',alignItems: 'center',height:'90%'
    },
    tabContainer: {
        height: "10%", backgroundColor: 'white', flexDirection: 'row'
    },
    tab1: {
        width: "25%", height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
    },
    textTab: {
        fontFamily: 'Exo Medium', fontSize: 10, color: 'black' 
    }

});

export default styles;