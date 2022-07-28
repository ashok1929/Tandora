import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, FlatList, Image, ImageBackground, Dimensions, LayoutAnimation, Platform, UIManager } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            fruitLIst: false,
            enabled: true,
            enablelocationLayout: true,
        };
    }

    onChangeLayout = fruitName => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: fruitName, enabled: false });
    };

    componentDidMount() {



        const getNearbyPosts = async () => {
            Geolocation.getCurrentPosition((info) => {
                this.setState({ enablelocationLayout: false })
                this.setState({ latitude: info.coords.latitude, longitude: info.coords.longitude });
            })



            console.log(this.state.latitude)
            let usrdata = await AsyncStorage.getItem('user');
            let user = JSON.parse(usrdata);
            if (this.state.latitude != 0 && this.state.longitude != 0) {
                await axios.get(`https://spreadora2.herokuapp.com/api/nearby/${this.state.latitude}/${this.state.longitude}/${user.username}`)
                    .then((res) => {
                        var dataURL = []
                        for (var i = 0; i < res.data.length; i++) {
                            dataURL.push(res.data[i])
                        }
                        console.log(dataURL)
                        this.setState({ data: dataURL })
                        this.setState({
                            fruitLIst: true,
                            dataURL,

                        })
                    })
                    .catch((e) => console.log("Error in get nearby posts: " + e))
            }
        }

        Geolocation.getCurrentPosition((info) => {
            console.log(info)
            getNearbyPosts()
            this.setState({ enablelocationLayout: false });


        })










    }

    FlatListItemSeparator = () => {
        return <View style={{ marginVertical: 5 }} />;
    };

    render() {




        const TimeComponent = (time) => {

            console.log(time)
            return moment(new Date(time.time)).fromNow();

        }




        return (
            <View style={styles.container}>


                <View style={{ height: 50, backgroundColor: '#fff', width: '100%', alignItems: 'center', justifyContent: "center" }}>
                    <Text style={{ color: '#2ca7e0', fontWeight: '800', fontSize: 23 }}>Nearby Posts</Text>
                </View>


                {this.state.enablelocationLayout &&
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', top: 300 }}>

                        <Entypo
                            name="location-pin"
                            size={55}
                            color="#2ca7e0"
                        />

                        <Text>Enable location to see nearby posts</Text>

                    </View>
                }




                {this.state.fruitLIst ? (
                    <FlatList
                        data={this.state.dataURL}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item, index }) => (







                            <View style={{ paddingBottom: 20 }}>

                                <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center' }}>
                                    <Image source={item.url != '' ? { uri: item.profileURL } : require('../Images/user_placeholder.png')} style={{ width: 40, height: 40, borderRadius: 15 }} />
                                    <View style={{ left: 20 }}>
                                        <Text style={styles.user_name}>{item.username}</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', top: 10, justifyContent: 'center', width: Dimensions.get('window').width }}>
                                    <ImageBackground source={{ uri: item.imageURL }} style={{ width: '95%', height: 250 }} imageStyle={{ borderRadius: 14 }}>

                                        <LinearGradient
                                            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                                            style={{ height: this.state.expanded === item.description ? 0 : '50%', width: '95%', borderRadius: 14, position: 'absolute', bottom: 0 }}>

                                            <View style={{ padding: 10, position: 'absolute', bottom: 0, height: this.state.expanded === item.description ? 0 : null }}>
                                                <Text style={{ color: '#fff' }}>{item.description.slice(0, 40)}...</Text>
                                                <TouchableOpacity activeOpacity={0.8} onPress={() => { this.onChangeLayout(item.description); }} style={styles.Btn}><Text style={{ color: '#fff', fontWeight: '700' }}>see more</Text></TouchableOpacity>
                                            </View>
                                        </LinearGradient>

                                    </ImageBackground>

                                    <View style={{ height: this.state.expanded === item.description ? null : 0, overflow: 'hidden', padding: 10 }}>

                                        <Text style={styles.text}>{item.description}</Text>

                                        <View style={{ bottom: 0 }}>
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => { this.setState({ expanded: false }) }} style={styles.Btn}><Text style={{ fontWeight: '700' }}>see less</Text></TouchableOpacity>
                                        </View>

                                        <Text></Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', top: 20, left: 10 }}>
                                    <Entypo
                                        name="location-pin"
                                        size={25}
                                        color="#696969"
                                    />
                                    <Text>{item.distance} kms aways    </Text>

                                    <Text>{<TimeComponent time={item.updatedAt} />}</Text>

                                    {/* 
                                    {item.date == new Date().toLocaleDateString() ?

                                        <>
                                            <>
                                                {item.hour.slice(-2) == formatAMPM(new Date()).slice(-2) ?

                                                    <>
                                                        {
                                                            item.hour.slice(0, 2) == formatAMPM(new Date()).slice(0, 2) ?
                                                            <>
                                                                
                                                            <Text>{(parseInt(item.hour.substring(3, 5).trim())) - parseInt(formatAMPM(new Date()).slice(3,5)) < 0 ? (parseInt(formatAMPM(new Date()).slice(3,5) - parseInt(item.hour.substring(3, 5).trim()))) : (parseInt(item.hour.substring(3, 5).trim())) - parseInt(formatAMPM(new Date()).slice(3,5))}  mins ago</Text>
                                                            </>
                                                            : 
                                                            <>
                                                                <Text>{(parseInt(item.hour.substring(0,2).trim())) - parseInt(formatAMPM(new Date()).slice(0,2)) < 0 ? (parseInt(formatAMPM(new Date()).slice(0,2)) - parseInt(item.hour.substring(0,2).trim())) : (parseInt(item.hour.substring(0,2).trim())) - parseInt(formatAMPM(new Date()).slice(0,2))}  hrs ago</Text>

                                                            </>
                                                                   
                                                                
                                                        }

                                                    </>
                                                    :
                                                    <>                                                                 
                                                        <Text>{(parseInt(item.hour.substring(0,2).trim())) + 12 - parseInt(formatAMPM(new Date()).slice(0,2)) < 0 ? (parseInt(formatAMPM(new Date()).slice(0,2) - parseInt(item.hour.substring(0,2).trim())) + 12) : (parseInt(item.hour.substring(0,2).trim())) + 12 - parseInt(formatAMPM(new Date()).slice(0,2))}  mins ago</Text>
                                                    </>
                                                }
                                            </>
                                           
                                        </>

                                        : <Text>{item.date}</Text>


                                    }
 */}






                                </View>

                            </View>
                        )


                            //   <View>
                            //     <TouchableOpacity
                            //       onPress={() => {
                            //         this.onChangeLayout(item.description);
                            //       }}
                            //       style={{
                            //         height: 50,
                            //         justifyContent: 'center',
                            //         alignItems: 'center',
                            //         backgroundColor: '#1EACA8',
                            //       }}>
                            //       <Text style={styles.text}>{item.id}</Text>
                            //     </TouchableOpacity>
                            //     <View
                            //       style={{
                            //         height: (this.state.expanded === item.description) ? null : 0,
                            //         overflow: 'hidden',
                            //       }}>
                            //       <Text onPress={() => { this.setState({expanded: false}) }}>{item.description}</Text>
                            //     </View>
                            //   </View>
                            // )


                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : null}


                <TouchableOpacity
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: '#fff',
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                    }}
                    onPress={() => this.props.navigation.navigate('Post')}
                >
                    <Image
                        source={require('../Images/logo.jpeg')}
                        style={{
                            width: 50, height: 50, borderRadius: 30, left: 5, top: 5
                        }}

                    />
                </TouchableOpacity>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    user_name: {
        fontWeight: '700',
        fontSize: 20,
        color: '#000'
    },
});







/*
import React,{Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet,PermissionsAndroid,FlatList,Image,ImageBackground,Dimensions,LayoutAnimation, Platform, UIManager} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import { getPathFromState } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class Nearby extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            data: [],
            expanded: false
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidMount() {

        Geolocation.getCurrentPosition((info) => {
            console.log(info)
            this.setState({latitude: info.coords.latitude,longitude: info.coords.longitude});
            getNearbyPosts()
        })

        

       const getNearbyPosts = async () => {
        console.log(this.state.latitude)
        let usrdata = await AsyncStorage.getItem('user');
        let user = JSON.parse(usrdata);
        if(this.state.latitude != 0 && this.state.longitude != 0) {
            await axios.get(`https://spreadora2.herokuapp.com/api/nearby/${this.state.latitude}/${this.state.longitude}/${user.username}`)
            .then((res) => {
                var dataURL = []
                for(var i=0;i<res.data.length;i++) {
                    dataURL.push(res.data[i][1])
                }
                console.log(dataURL)
                this.setState({data: dataURL})
            })
            .catch((e) => console.log(e))
        }
       }

       

    }

    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
      }


    render() {

        const Item = ({ url,desc,time,date,distance,username }) => (

            <View style={{paddingBottom:30}}>

                <View style={{top: 20,flexDirection:'row',padding:20,alignItems:'center'}}>
                    <Image source={require('../Images/user_placeholder.png')} style={{width: 40,height:40}} />
                    <View style={{left: 20}}>
                        <Text style={styles.user_name}>{username}</Text>
                    </View>
                </View>
                <View style={{alignItems:'center',top: 30,justifyContent: 'center',left:10,width:Dimensions.get('window').width}}>
                    <ImageBackground source={{uri: "https://spreadora2.herokuapp.com"+url}} style={{width: '95%',height:250}}  imageStyle={{ borderRadius: 14}}>
                    { !this.state.expanded &&
                        <LinearGradient 
                            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} 
                            style={{height : '50%', width : '95%',borderRadius:14,position:'absolute',bottom:0}}>
                              
                                <View style={{padding:10,position:'absolute',bottom:0}}>
                                    <Text style={{color:'#fff'}}>{desc.slice(0,40)}...</Text>
                                    <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout} style={styles.Btn}><Text style={{color:'#fff',fontWeight:'700'}}>see more</Text></TouchableOpacity>
                                </View>
                                
                                
                        </LinearGradient>
                        }
                    </ImageBackground>
                   
                    <View style={{ height: this.state.expanded ? null : 0, overflow: 'hidden',padding:10 }}>
                                        <Text style={styles.text}>{desc}</Text>
                                        { this.state.expanded &&
                                <View style={{bottom:0}}>
                                    <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout} style={styles.Btn}><Text style={{fontWeight:'700'}}>see less</Text></TouchableOpacity>
                                </View>
                                }
                                <Text></Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',top:20,left: 10}}>
                    <Entypo
                        name="location-pin"
                        size={25}
                        color="#696969"
                    />
                    <Text>{distance} kms aways   *</Text>
                    <Text>  {time} ago  </Text>
                    
                </View>
                
                </View>
            
            // <View style={{padding:5}}>
            //     <TouchableOpacity>
            //         <Image
            //             source={{uri: "https://spreadora2.herokuapp.com"+url}}
            //             style={{width:Dimensions.get('window').width,height:200,resizeMode:'contain'}}
            //         />
            //    </TouchableOpacity>
            //    <View style={{height:50,justifyContent:'center',margin:10}}>
            //         <Text style={styles.desc}>{desc}</Text>
            //         <View style={{flexDirection:'row',justifyContent:'space-between',top:5,bottom:5}}>
            //             <Text style={styles.date}>{date}</Text>
            //             <Text style={styles.time}>{time}</Text>
            //         </View>
            //    </View>
            // </View>
          );


        const renderItem = ({ item }) => {
            return(
                <Item
                    url={item.imageURL}
                    desc={item.description}
                    time={item.time}
                    date={item.date}
                    distance={item.distance}
                    username={item.username}
                />
            );
            
            
          };

    
        const getPos = () => {
            Geolocation.getCurrentPosition((info) => {
                console.log(info)
            })
        }
            
            
       


        return(
            <View style={styles.container}>
                 <View style={{height:50,backgroundColor:'#2ca7e0',width:'100%',justifyContent:'center'}}>
                    <Text style={{color:'#fff',fontWeight:'800',fontSize:20,left:20}}>Nearby Posts</Text>
                </View> 
                
                <FlatList
                    data={this.state.data}
                    renderItem={renderItem}
                    keyExtractor={(item)=> item.username}
                />
                
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    user_name: {
        fontWeight: '700',
        fontSize: 20,
        color:'#000'
    },
})

*/