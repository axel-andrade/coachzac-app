import React from 'react'
import { View, Text, Image, Button, Alert, AsyncStorage, Platform } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { Overlay } from 'react-native-maps';

const Parse = require('parse/react-native');
Parse.setAsyncStorage(AsyncStorage);

export default class Teste extends React.Component {
  state = {
    photo: null,
  }

  componentDidMount() {
    Alert.alert(this.state.photo);
  };

  handleChoosePhoto = () => {
    
    ImagePicker.openPicker({
        cropping: true,
        cropperCircleOverlay: true,
    }).then(image => {
       this.pegarphotoCortada(image.path);
    });

  };

  pegarphotoCortada = (path) => {
    ImagePicker.openCropper({
        path: path,
        width: 300,
        height: 400
      }).then(image => {
        this.setState({photo: image})
      });
  };

  uploadPhoto = async (response) => {

    let data = JSON.stringify(response);

    let name = data.fileName;
    let type = data.type;
    let uri = Platform.OS === "android" ? data.uri : data.uri.replace("file://", "");


    //Alert.alert(uri);
    Parse.initialize('coachzacId');
    Parse.serverURL = 'https://coachzac-api.herokuapp.com/use';
    let parseFile = new Parse.File(name, { base64: response.data });
    const result = await parseFile.save();
    this.setState({ photo: result });
  };

  render() {
    const { photo } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: photo.path }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        <Text>{JSON.stringify(this.state.photo)}</Text>
      </View>
    )
  }
}

