import React,{Component} from "react";
import {View,Image,Text,Dimensions} from 'react-native'

export default class SplashScreen extends Component {
   render(){
    return(
        <View style={{flex:1}}>
            <Image
             source={require('../Images/SplashScreenImage.jpeg')}
             style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
            />
        </View>
    )
   }
}