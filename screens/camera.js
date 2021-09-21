import * as React from "react"
import { Button,Image,View,Platform } from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
import { render } from "react-dom";

export default class PickImage extends React.Component{
    state = {
        image:null,
    };


    getPermissionsAsync = async()=>{
    if(Platform.OS!=="web"){
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(status !== "granter"){
            alert("WE NEED PERMISSIONS")
        }
    }
    }
    uploadImage = async(url)=>{
        const data = new FormData();
        let filename = uri.split("/")[uri.split("/").length - 1]
        let type = `image/${uri.split('.')[uri.split('.').length - 1]}`
        const fileToUpload = {
          uri: uri,
          name: filename,
          type: type,
        };
        data.append("digit", fileToUpload);
        fetch("https://c665-2405-201-d003-309e-6029-97ff-cf84-1e93.ngrok.io/predict-letter", {
          method: "POST",
          body: data,
          headers: {
            "content-type": "multipart/form-data",
          },
        })
          .then((response) => response.json())
          .then((result) => {
            console.log("Success:", result);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
    }
    _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ image: result.data });
            console.log(result.uri)
            this.uploadImage(result.uri);
          }
        } catch (E) {
          console.log(E);
        }
      };
    

    componentDidMount(){
        this.getPermissionsAsync()
    }
    render(){
    let {image} = this.state;
    return(
        <View style = {{flex:1,alignItems:'center',justifyContent:"center"}}>
            <Button
            title="Pick an image from camera roll"
            onPress = {this._pickImage}
            />
        </View>
    
    )
    }

}

