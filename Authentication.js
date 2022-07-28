import axios from 'axios';
import React, {Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native';
import { LoginButton, AccessToken, Profile, Settings } from 'react-native-fbsdk-next';

export default class Authentication extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Settings.setAppID('475134684169970');
        Settings.initializeSDK();

        Profile.getCurrentProfile().then(
            function(current) {
              if (current) {
                console.log(current);
              }
            }
          );

        

    }

    render() {


        const _storeData = async (token,emailID,name) => {
            try {
                let userCredentials = {
                    jwt: token,
                    email: emailID,
                    username: name
                }
                await AsyncStorage.setItem('user',JSON.stringify(userCredentials))
                .then(() => this.props.navigation.navigate('HomeScreen'));
                
            }
            catch(err) {
                alert(err)
                console.log(err)
            }
        
        }

        const fbLoginToStrapi = async (accessTk) => {
            console.log(accessTk)
            await axios.get(`https://spreadora2.herokuapp.com/api/auth/facebook/callback?access_token=${accessTk}`)
            .then((res) => console.log(res))
            .catch((e) => console.log(e))
        }



        return(
            <View style={styles.container}>
                <Image 
                    source={require('../Images/logo.jpeg')}
                    style={{width:70,height:70,top:50}}
                />
                <Text style={styles.create}>Create account</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.haveAcc}>Have an account?  </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                </View>

                
                <View style={{top:100}}>
                    <LoginButton
                    
                    onLoginFinished={
                    (error, result) => {
                    if (error) {
                    console.log("login has error: " + result.error);
                    } else if (result.isCancelled) {
                    console.log("login is cancelled.");
                    } else {

                    AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        //console.log(data.accessToken.toString())
                        fbLoginToStrapi(data.accessToken.toString())
                    }
                    )
                    }
                    }
                    }
                    onLogoutFinished={() => console.log("logout.")}/>
                </View>




            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    create: {
        fontSize: 30,
        fontWeight:'800',
        color:'#000',
        top:70
    },
    haveAcc: {
        top:90,
        fontWeight: '600',
        fontSize: 16
    },
    loginText: {
        top:90,
        fontWeight: '800',
        fontSize: 16,
        color: '#2ca7e0'
    }
})






/*


                    


                    <Button title={'Sign in with Google'} onPress={() =>  {
                            GoogleSignin.configure({
                                androidClientId: '1087775513299-p4pdjknqfksimmu1h9h5ohqbi92ldjns.apps.googleusercontent.com',
                                
                            });
                        GoogleSignin.hasPlayServices().then((hasPlayService) => {
                                if (hasPlayService) {
                                    GoogleSignin.signIn().then((userInfo) => {
                                            console.log(JSON.stringify(userInfo))
                                    }).catch((e) => {
                                    console.log("ERROR IS: " + JSON.stringify(e));
                                    })
                                }
                        }).catch((e) => {
                            console.log("ERROR IS: " + JSON.stringify(e));
                        })
                        }} />




*/