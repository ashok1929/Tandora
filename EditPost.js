import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, Modal, TouchableHighlight } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from "@react-native-community/async-storage";
import ImagePicker from 'react-native-image-crop-picker';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { NavigationEvents } from 'react-navigation';


export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mime: '',
            path: '',
            desc: this.props.route.params.selectedDesc,
            jwt: '',
            username: '',
            url: '',
            enabledPost: true,
            disabledPost: false,
            enablePop: false,
            modalVisible: false,

        }
    }

    addImage() {

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image.path);
            this.setState({ mime: image.mime, path: image.path })
        });

    }

    componentDidMount() {

        this._unsubscribe = this.props.navigation.addListener('focus', () => {

            const getUser = async () => {

                let usrdata = await AsyncStorage.getItem('user');
                let user = JSON.parse(usrdata);
                this.setState({ username: user.username, jwt: user.jwt });

                await axios.get('https://spreadora2.herokuapp.com/api/profiles', {
                    headers: {
                        'Authorization': `Bearer ${user.jwt}`,
                    },
                })
                    .then((res) => {
                        if (res.data.data.length != 0) {
                            for (var i = 0; i < res.data.data.length; i++) {
                                if (res.data.data[i].attributes.username == user.username) {
                                    this.setState({ url: res.data.data[i].attributes.url })
                                }
                            }

                        }
                    })
                    .catch((e) => console.log(e))

            }

            getUser()


        });


    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    render() {



        const makePost = async () => {

            this.setState({ disabledPost: true, enabledPost: false })
            this.setState({ enablePop: true })


            /*
            

            await fetch('https://spreadora2.herokuapp.com/api/upload/files',{
                headers: {
                    Authorization : `Bearer ${user.jwt}`
                }
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
            .catch((e) => console.log(e))
*/


            const formData = new FormData();


            formData.append('files', {
                name: 'Success.jpg',
                type: this.state.mime,
                uri: this.state.path,
            });


            if (this.state.path != '') {

                await fetch(`https://spreadora2.herokuapp.com/api/upload`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${this.state.jwt}`
                    },
                    body: formData,
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response[0].url);



                        Geolocation.getCurrentPosition((info) => {
                            console.log(info.coords.latitude, info.coords.longitude)


                            const d = new Date();
                            console.log(d.toLocaleDateString(), (d.getHours() + 24) % 12 || 12, d.getMinutes() + 1,)

                            fetch(`https://spreadora2.herokuapp.com/api/posts/${this.props.route.params.selectedID}`, {
                                method: 'PUT',
                                headers: {
                                    'Authorization': `Bearer ${this.state.jwt}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    "data": {
                                        "description": this.state.desc,
                                        "imageURL": response[0].url,
                                        "date": d.toLocaleDateString(),
                                        "username": this.state.username,
                                        "latitude": info.coords.latitude,
                                        "longitude": info.coords.longitude,
                                        "profileURL": this.state.url,
                                        "hour": d.toLocaleString('en-US', { hour: 'numeric', hour12: true }),
                                        "minute": d.getMinutes()
                                    }

                                })
                            })

                                .then((res) => {
                                    alert('Image posted successfully')
                                    console.log("Post datas added", res)
                                    this.setState({ path: '' })
                                    this.textInput.clear();
                                    this.setState({ disabledPost: false, enabledPost: true })
                                    this.props.navigation.goBack();
                                })
                                .catch((e) => {
                                    console.log(e)
                                    this.setState({ disabledPost: false, enabledPost: true })

                                })




                        }, error => {
                            alert('Error', JSON.stringify(error))
                            this.setState({ disabledPost: false, enabledPost: true })

                        },
                            { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 })

                    })
                    .catch(error => {
                        console.log('error', error);
                    });
            }
            else {

                Geolocation.getCurrentPosition((info) => {
                    console.log(info.coords.latitude, info.coords.longitude)


                    const d = new Date();
                    console.log(d.toLocaleDateString(), (d.getHours() + 24) % 12 || 12, d.getMinutes() + 1,)

                    fetch(`https://spreadora2.herokuapp.com/api/posts/${this.props.route.params.selectedID}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${this.state.jwt}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "data": {
                                "description": this.state.desc,
                                "imageURL": this.props.route.params.selectedURL,
                                "date": d.toLocaleDateString(),
                                "username": this.state.username,
                                "latitude": info.coords.latitude,
                                "longitude": info.coords.longitude,
                                "profileURL": this.state.url,
                                "hour": d.toLocaleString('en-US', { hour: 'numeric', hour12: true }),
                                "minute": d.getMinutes()
                            }

                        })
                    })

                        .then((res) => {
                            alert('Image posted successfully')
                            console.log("Post datas added", res)
                            this.setState({ path: '' })
                            this.textInput.clear();
                            this.setState({ disabledPost: false, enabledPost: true })
                            this.props.navigation.goBack();

                        })
                        .catch((e) => {
                            console.log(e)
                            this.setState({ disabledPost: false, enabledPost: true })

                        })




                }, error => {
                    alert('Error', JSON.stringify(error))
                    this.setState({ disabledPost: false, enabledPost: true })

                },
                    { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 })


            }
        }

        //<NavigationEvents onDidFocus={() => console.log('I am triggered')} />



        return (
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                         <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Ionicons
                                name="close-outline"
                                size={35}
                                color="#000"
                            /> 
                        </TouchableOpacity>
                        <Text style={styles.newPost}>Edit Post</Text>
                    </View>
                    <View>{this.state.enabledPost &&
                        <TouchableOpacity onPress={() => makePost()} style={styles.postButton}>
                            <Text style={{ color: '#fff' }}>Post</Text>
                        </TouchableOpacity>
                    }
                        {this.state.disabledPost &&
                            <View style={styles.postButtonFade}>
                                <Text style={{ color: '#fff' }}>Post</Text>
                            </View>
                        }
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', left: 20 }}>
                    <Image
                        source={this.state.url == '' ? require('../Images/user_placeholder.png') : { uri: this.state.url }}
                        style={styles.userImage}
                    />
                    <Text style={styles.username}>{this.state.username}</Text>
                </View>
                <View style={{ top: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.addImage()} style={styles.addButton}>
                        <Entypo
                            name="edit"
                            size={25}
                            style={{ right: 5 }}
                        />
                        <Text style={{ color: '#0a79ed', fontSize: 17, fontWeight: '700' }}> Edit</Text>
                    </TouchableOpacity>
                    <View style={styles.uplaodedImage}>

                        <Image
                            source={{ uri: this.state.path == '' ? "https://spreadora2.herokuapp.com" + this.props.route.params.selectedURL : this.state.path }}
                            style={{ width: 300, height: 190 }}
                        />
                    </View>

                </View>
                <View style={{ width: '100%', top: 10 }}>
                    <TextInput
                        style={{ left: 25, fontSize: 17, width: '85%' }}
                        placeholder="Description"
                        multiline={true}
                        editable={true}
                        numberOfLines={3}
                        maxHeight={350}
                        maxLength={300}
                        defaultValue={this.props.route.params.selectedDesc}
                        ref={input => { this.textInput = input }}
                        onChangeText={(e) => this.setState({ desc: e })}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    newPost: {
        fontSize: 17,
        color: '#000'
    },
    postButton: {
        borderRadius: 5,
        width: 70,
        height: 30,
        backgroundColor: '#2ca7e0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    postButtonFade: {
        borderRadius: 5,
        width: 70,
        height: 30,
        backgroundColor: '#599feb',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userImage: {
        borderRadius: 30,
        height: 50,
        width: 50,
    },
    username: {
        left: 20,
        color: '#000',
        fontSize: 17
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#b9d6ed',
        padding: 10,
        borderRadius: 10
    },
    uplaodedImage: {
        top: 30,
        borderStyle: 'dashed',
        borderRadius: 10,
        width: '85%',
        height: '50%',
        borderColor: '#000',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});