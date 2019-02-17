import React from 'react'
import { View, Text, Image, Button, Alert, AsyncStorage, Platform } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { RNS3 } from 'react-native-aws3';

export default class Teste extends React.Component {
  state = {
    photo: null,
  }

  componentDidMount() {
    Alert.alert(this.state.photo);
  };

  handleChoosePhoto = () => {
    const options = {
      //noData: true,
    }
    //launchCamera 
    ImagePicker.launchImageLibrary(options, response => {
      if (response) {
        this.uploadPhoto(response);
        //this.setState({photo: response})
      }
      else {

      }
    })

  };

  uploadPhoto = async (response) => {

    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: response.uri,
      name: response.fileName,
      type: response.type
    }
    
    const options = {
      keyPrefix: "uploads/",
      bucket: "coachzac-api",
      region: "sa-east-1",
      accessKey: "AKIAIWTECPSPUN6TM23A",
      secretKey: "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",
      successActionStatus: 201
    }
    
    RNS3.put(file, options).then(response => {
      if (response.status !== 201)
          this.setState({error: true});
      else
        this.setState({photo: response.body});
    });
  };

  render() {
    const { photo } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        <Text>{JSON.stringify(this.state.photo)}</Text>
      </View>
    )
  }
}



// import React from 'react'
// import { View, Text, Image, Button, Alert, AsyncStorage, Platform } from 'react-native'
// import ImagePicker from 'react-native-image-picker'
// const Parse = require('parse/react-native');
// const base64 = require('base-64');
// const utf8 = require('utf8');
// //Before using the SDK...
// Parse.setAsyncStorage(AsyncStorage);

// export default class Teste extends React.Component {
//   state = {
//     photo: null,
//   }

//   componentDidMount() {
//     Alert.alert(this.state.photo);
//   };

//   handleChoosePhoto = () => {
//     const options = {
//       //noData: true,
//     }
//     //launchCamera 
//     ImagePicker.launchImageLibrary(options, response => {
//       if (response) {
//         this.uploadPhoto(response);
//         //this.setState({photo: response})
//       }
//       else {

//       }
//     })

//   };

//   uploadPhoto = async (response) => {

//     let data = JSON.stringify(response);

//     let name = data.fileName;
//     let type = data.type;
//     let uri = Platform.OS === "android" ? data.uri : data.uri.replace("file://", "");


//     //Alert.alert(uri);
//     Parse.initialize('coachzacId');
//     Parse.serverURL = 'https://coachzac-api.herokuapp.com/use';
//     let parseFile = new Parse.File(name, { base64: response.data });
//     const result = await parseFile.save();
//     this.setState({ photo: result });
//   };

//   render() {
//     const { photo } = this.state
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         {photo && (
//           <Image
//             source={{ uri: photo.uri }}
//             style={{ width: 300, height: 300 }}
//           />
//         )}
//         <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
//         <Text>{JSON.stringify(this.state.photo)}</Text>
//       </View>
//     )
//   }
// }

// const createFormData = (photo, body) => {
//   const data = new FormData();

//   data.append("photo", {
//     name: photo.fileName,
//     type: photo.type,
//     uri:
//       Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
//   });

//   Object.keys(body).forEach(key => {
//     data.append(key, body[key]);
//   });

//   return data;
// };