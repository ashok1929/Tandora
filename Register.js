import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage";
import ScrollPicker from 'react-native-wheel-scroll-picker';
import Modal from "react-native-modalbox";
import DropDownPicker from 'react-native-dropdown-picker';


const { width, height } = Dimensions.get("window");


export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            passw: '',
            yob: 0,
            gender: '',
            button: true,
            buttonFade: false,
            maleButtonColor: '#841584',
            femaleButtonColor: '#C0C0C0',
            modalVisible: false,
            country: 'uk'
        };
    }






    render() {
        /*
                const authenticateUser = async () => {
                 
                    if(this.state.email != '' && this.state.passw != ''){
                      const user = new UserModel(this.state.email, this.state.passw);
              
                      try {
                        await user.login().then(() => this.props.navigation.navigate('HomeScreen'));
                      } catch (err) {
                          alert(err.message)
                      }
                    }
                  
                }; 
                */


        const _storeData = async (token, emailID, name) => {
            try {
                let userCredentials = {
                    jwt: token,
                    email: emailID,
                    username: name
                }
                await AsyncStorage.setItem('user', JSON.stringify(userCredentials))
                    .then(() => this.props.navigation.replace('HomeScreen'));

            }
            catch (err) {
                alert(err)
                console.log(err)
            }

        }

        const login = async () => {
            if (this.state.username == '') {
                alert('Enter valid user name')
            }
            if (this.state.email == '') {
                alert('Enter valid email')
            }
            if (this.state.passw == '') {
                alert('Enter valid password')
            }


            const validatePassword = (pw) => {

                return /[A-Z]/.test(pw) &&
                    /[a-z]/.test(pw) &&
                    /[0-9]/.test(pw) &&
                    /[^A-Za-z0-9]/.test(pw) &&
                    pw.length > 4;

            }

            if (validatePassword == false) {
                alert('At least one uppercase letter\n At least one lowercase letter\n At least one digit\n At least one special symbol\n should be more than 4 character\n')
            }


            if (this.state.username != '' && this.state.email != '' && validatePassword) {
                this.setState({ button: false, buttonFade: true });

                const url = 'https://spreadora2.herokuapp.com';


                const requestConfig = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "username": this.state.username.trim(),
                        "email": this.state.email.trim(),
                        "password": this.state.passw.trim(),
                    }),
                };

                try {
                    const res = await fetch(`${url}/api/auth/local/register`, requestConfig).catch((e) => alert(e));
                    console.log(res)
                    const json = await res.json();
                    if (json.error) {
                        alert(json.error.message)
                        console.log(json)
                        this.setState({ button: true, buttonFade: false })
                    }
                    else {
                        console.log(json)
                        _storeData(json.jwt, json.user.email, json.user.username);
                        await fetch('https://spreadora2.herokuapp.com/api/appusers', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${json.jwt}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "data": {
                                    "username": this.state.username.trim(),
                                    "email": this.state.email.trim(),
                                    "yob": this.state.yob,
                                    "gender": this.state.gender.trim()
                                }
                            })
                        })
                            .then((res) => console.log(res))
                            .catch((e) => console.log("Failed to insert data in appusers  " + e))
                    }


                }
                catch (err) {
                    alert(err);
                    console.log("Authentication failed  " + err);
                }

            }

        }

        return (






            <View style={styles.container}>

                <View style={{ padding: 20, alignItems: 'center', top: 40 }}>
                    <Image source={require('../Images/logo.jpeg')} style={{ width: 80, height: 80 }} />
                    <Text style={styles.loginText}>Signup to Spreadora</Text>
                    <View style={{ flexDirection: 'row' }}><Text style={{ top: 20, fontSize: 18 }}>Already have an account? </Text><TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Text style={{ color: '#007aff', top: 20, fontSize: 18 }}>Login</Text></TouchableOpacity></View>
                    {/* <View style={{top: 60,flexDirection:'row'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../Images/googleLogo.png')} style={{width: 30,height:30}}/>
                            <Text style={{left: 20,fontSize:18}}>Sign in with Google</Text>
                        </View>
                        <View style={{left: 40}}>
                            <Image source={require('../Images/facebookLogo.jpeg')} style={{width:60,height:60}}/>
                        </View>
                    </View> 
                    <Text style={{top: 80}}>OR</Text>
        */}
                </View>
                <View style={{ top: 120, left: 30 }}>

                    <TextInput
                        placeholder="Enter gender"
                        style={styles.gender}
                        onChangeText={(u) => this.setState({ gender: u })}
                    />

                    <TextInput
                        placeholder="Enter YOB"
                        style={styles.yob}
                        keyboardType='number-pad'
                        onChangeText={(u) => this.setState({ yob: u })}
                    />

                    <TextInput
                        placeholder="Enter username"
                        style={styles.username}
                        onChangeText={(u) => this.setState({ username: u })}
                    />

                    <TextInput
                        placeholder="Enter email"
                        style={styles.email}
                        onChangeText={(e) => this.setState({ email: e })}
                    />
                    <TextInput
                        placeholder="Enter password"
                        style={styles.passw}
                        secureTextEntry={true}
                        onChangeText={(p) => this.setState({ passw: p })}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    {this.state.buttonFade &&
                        <View style={styles.buttonFade} >
                            <Text style={styles.buttonText}>Login</Text>
                        </View>
                    }
                    {this.state.button &&
                        <TouchableOpacity onPress={() => login()} style={styles.button} >
                            <Text style={styles.buttonText}>Signup</Text>
                        </TouchableOpacity>
                    }

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    loginText: {
        fontWeight: '700',
        fontSize: 30,
        color: '#000',
        top: 10
    },
    username: {
        color: '#000',
        width: '80%',
        backgroundColor: '#d6d6d4',
        top: 20,
        borderRadius: 10
    },
    email: {
        color: '#000',
        width: '80%',
        backgroundColor: '#d6d6d4',
        top: 30,
        borderRadius: 10
    },
    passw: {
        color: '#000',
        width: '80%',
        backgroundColor: '#d6d6d4',
        top: 40,
        borderRadius: 10
    },
    button: {
        borderRadius: 5,
        backgroundColor: '#007aff',
        width: '80%',
        height: 60,
        top: 170,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonFade: {
        borderRadius: 5,
        backgroundColor: '#599feb',
        width: '80%',
        height: 60,
        top: 170,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700'
    },
    yob: {
        color: '#000',
        width: '80%',
        backgroundColor: '#d6d6d4',
        top: 10,
        borderRadius: 10
    },
    gender: {
        color: '#000',
        width: '80%',
        backgroundColor: '#d6d6d4',
        top: 0,
        borderRadius: 10
    },
    modalBox: {
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        height,
        width,
        backgroundColor: "transparent"
    },
    content: {
        position: "absolute",
        bottom: 0,
        width,
        height: 250,
        borderTopLeftRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 20,
        backgroundColor: "white"
    },
    textStyle: {
        fontSize: 22
    },
})
