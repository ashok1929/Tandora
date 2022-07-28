/*
import React, { Component } from 'react';
 import { Text, View, StyleSheet, LayoutAnimation, Platform, UIManager,TouchableOpacity } from 'react-native';
 export default class Trending extends Component {
   constructor(){
     super();
      this.state = { expanded: false }
      if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
      }
   }
   changeLayout = () => {
     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
     this.setState({ expanded: !this.state.expanded });
   }
    render() {
      return ( 
       <View style={styles.container}> 
          <View style={styles.btnTextHolder}> 
             <TouchableOpacity activeOpacity={0.8} 
                    onPress={this.changeLayout} style={styles.Btn}> 
                <Text style={styles.btnText}>Expand / Collapse</Text>
             </TouchableOpacity>
             <View style={{ height: this.state.expanded ? null : 0,
                    overflow: 'hidden' }}>
             <Text style={styles.text}>
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries,
                but also the leap into electronic typesetting, remaining
                essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum
                passages, and more recently with desktop publishing software
                like Aldus PageMaker including versions of Lorem Ipsum.
              </Text>
           </View>
          
         </View> 
       </View> 
    );
   }
 }
  const styles = StyleSheet.create({
    container: { 
       flex: 1,
       paddingHorizontal: 10,
       justifyContent: 'center',
       paddingTop: (Platform.OS === 'ios') ? 20 : 0 },
    text: { 
       fontSize: 17,
       color: 'black',
       padding: 10 },
    btnText: {
       textAlign: 'center',
       color: 'white',
       fontSize: 20 },
    btnTextHolder: {
       borderWidth: 1,
       borderColor: 'rgba(0,0,0,0.5)' },
    Btn: { 
       padding: 10,
       backgroundColor: 'rgba(0,0,0,0.5)' }
  });



*/





import React,{Component} from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity,ImageBackground, Dimensions,UIManager, LayoutAnimation, Platform,ScrollView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import LinearGradient from 'react-native-linear-gradient';
import { FloatingAction } from "react-native-floating-action";
import AsyncStorage from '@react-native-community/async-storage'

const actions = [
    {
      text: "spreadora2",
      icon: require("../Images/logo.jpeg"),
    },
]

export default class Trending extends Component 
{

    constructor(props) {
        super(props);
        this.state = { expanded: false }
      if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
    }

    render(){

        const signout = async () => {
            try {
                await AsyncStorage.removeItem('user')
                .then(() => this.props.navigation.replace('Login'));
                console.log('Sign out')

            }
            catch(err) {
                console.log(err)
            }
        }


        return(
            <View style={styles.container}>
                <View style={{flexDirection:'row',justifyContent:'space-between',padding:15}}>
                    <TouchableOpacity><Image source={require('../Images/user_placeholder.png')} style={{width:40,height:40}}/></TouchableOpacity>
                    <Text style={styles.spreadora2Text}>spreadora2</Text>
                    <TouchableOpacity><Ionicons name="md-search-outline" color="#000" size={38} /></TouchableOpacity>
                </View>


                <View>

                <View style={{top: 20,flexDirection:'row',padding:20,alignItems:'center'}}>
                    <Image source={require('../Images/user_placeholder.png')} style={{width: 40,height:40}} />
                    <View style={{left: 20}}>
                        <Text style={styles.user_name}>Ravi Kumar</Text>
                        <Text style={styles.user_occupation}>Journalist</Text>
                    </View>
                </View>
                <View style={{alignItems:'center',top: 30,justifyContent: 'center',left:10,width:Dimensions.get('window').width}}>
                    <ImageBackground source={require('../Images/mariyappan.jpeg')} style={{width: '95%',height:250}}  imageStyle={{ borderRadius: 14}}>
                    { !this.state.expanded &&
                        <LinearGradient 
                            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} 
                            style={{height : '50%', width : '95%',borderRadius:14,position:'absolute',bottom:0}}>
                              
                                <View style={{padding:10,position:'absolute',bottom:0}}>
                                    <Text style={{color:'#fff'}}>It wasn't an easy road to his silver medal for Mariyappan Thangavelu in the men's high jump T63 final at the Tokyo para..</Text>
                                    <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout} style={styles.Btn}><Text style={{color:'#fff',fontWeight:'700'}}>see more</Text></TouchableOpacity>
                                </View>
                                
                                
                        </LinearGradient>
                        }
                    </ImageBackground>
                    <View style={{ height: this.state.expanded ? null : 0, overflow: 'hidden',padding:10 }}>
                                        <Text style={styles.text}>
                                            Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry. Lorem Ipsum has been the industry's
                                            standard dummy text ever since the 1500s, when an unknown
                                            printer took a galley of type and scrambled it to make a
                                            type specimen book. It has survived not only five centuries,
                                            but also the leap into electronic typesetting, remaining
                                            essentially unchanged. It was popularised in the 1960s with
                                            the release of Letraset sheets containing Lorem Ipsum
                                            passages, and more recently with desktop publishing software
                                            like Aldus PageMaker including versions of Lorem Ipsum.
                                        </Text>
                                        { this.state.expanded &&
                                <View style={{padding:10,position:'absolute',bottom:-15}}>
                                    <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout} style={styles.Btn}><Text style={{color:'#000',fontWeight:'700'}}>see less</Text></TouchableOpacity>
                                </View>
                                }
                                <Text></Text>
                                    </View>
                </View>
                <View style={{flexDirection:'row',top:40,left: 10}}>
                    <Entypo
                        name="location-pin"
                        size={25}
                        color="#696969"
                    />
                    <Text>5 kms aways   *</Text>
                    <Text>  13 mins ago *   </Text>
                    <Feather 
                        name="eye"
                        size={25}
                        color="#696969"
                    />
                    <Text> 14 views</Text>
                </View>
                </View>

                {/*

                <View style={{alignItems:'center',top:50,flexDirection:'row'}}>
                    <Feather 
                        name="smile"
                        size={30}
                        color="#696969"
                        style={{left: 10}}
                    />
                    <View style={{flexDirection:'row'}}>
                        <Image source={require('../Images/user1.jpg')} style={{width:40,height:40,borderRadius:50,left:15}} />
                        <Image source={require('../Images/user2.jpg')} style={{width:40,height:40,borderRadius:50,right:15}} />
                        <Image source={require('../Images/user3.jpg')} style={{width:40,height:40,borderRadius:50,right:45}} />
                    </View>
                    <Text style={{right: 40}}>reacted by 456</Text>
                    <TouchableOpacity>
                    <Ionicons
                        name="chatbubble-outline"
                        size={30}
                        color="#696969"
                        style={{right:35}}
                    />
                    </TouchableOpacity>
                    
                    
                    <Entypo
                        name="modern-mic"
                        size={30}
                        color="#696969"
                        style={{right: 30}}
                    />
                    <TouchableOpacity><Text style={{color:'#2ca7e0',right:30}}>12 spreads</Text></TouchableOpacity>
                </View>
                 <View style={{top:60,left:10}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#000',fontSize:15,fontWeight:'700'}}>Kumaravel</Text>
                        <Text style={{color:'#696969',fontSize:15,left:5}}>This season is Amazing </Text>
                        <TouchableOpacity><Text style={{left:10}}>more</Text></TouchableOpacity>
                    </View>
                    <TouchableOpacity><Text>View all 120 comments</Text></TouchableOpacity>
                </View> */}
                <TouchableOpacity 
                    style={{width: 60,  
                        height: 60,   
                        borderRadius: 30,            
                        backgroundColor: '#fff',                                    
                        position: 'absolute',                                          
                        bottom: 10,                                                    
                        right: 10, 
                    }}
                >
                    <Image 
                        source={require('../Images/logo.jpeg')}
                        style={{width:50,height:50}}
                        
                    />
                </TouchableOpacity>
                
            </View>
        )
    }
}//'#00000000', '#000000'

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
    },
    spreadora2Text:{
        fontSize: 28,
        color:'#2ca7e0',
        fontWeight: '600'
    },
    user_name: {
        fontWeight: '700',
        fontSize: 24,
        color:'#000'
    },
    user_occupation: {
        color: '#b5b7ba',
        fontWeight: '500',
        fontSize: 20
    }
});
