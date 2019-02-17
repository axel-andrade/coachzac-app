'use strict'
import {AsyncStorage,Alert} from 'react-native';
const Parse = require('parse/react-native');
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('coachzacId');
Parse.serverURL = 'https://coachzac-api.herokuapp.com/use';


var utils = {

    uploadImage: async (response) => {

    
        let parseFile = new Parse.File("profile.jpg", { base64: response.data });
        const result = await parseFile.save();
        //resultado esta vindo alterado
        let temp = JSON.stringify(result).split('https');
        let url = temp[1];
        url = url.substr(0, (url.length - 2));
        url = "https"+ url;
        
        return "Bar";
        
    
    },
};

module.exports = utils;
