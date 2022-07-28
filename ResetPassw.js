import React,{Component} from "react";
import {View,Text,TouchableOpacity,StyleSheet,TextInput,Image, BackHandler} from 'react-native';
import url from 'url';
import axios from "axios";

export default class ResetPassw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            button: true,
            buttonFade: false,
            newPassword: '',
            confirmPassword: ''
        }
    }

    render() {
        console.log("This is the url of the reset   "+this.props.url.url);

         const obj = url.parse(this.props.url.url);
         let verifyCode = '';
         for(let i=0;i<this.props.url.url.length;i++) {
             if(this.props.url.url[i] == '='){
                 for(let j=i+1;j<this.props.url.url.length;j++) {
                     verifyCode += this.props.url.url[j];
                 }
             }
         }
         console.log(verifyCode);
         const reset = async () => {
             this.setState({buttonFade: true, button: false});
             if(this.state.newPassword === this.state.confirmPassword) {
                 await axios.post('https://spreadora2.herokuapp.com/api/auth/reset-password', {
                 code: verifyCode,
                 password: this.state.newPassword,
                 passwordConfirmation: this.state.confirmPassword,
               })
               .then(response => {
                 console.log(response);
                 alert("Please restart the app")
                 BackHandler.exitApp();
               })
               .catch(error => {
                 console.log('An error occurred:', error);
                 alert(error)
                 this.setState({buttonFade: false, button: true})
               })
             }
             else {
                 alert('Password not same')
             }

            
         }
    
        

        return (
            <View style={styles.container}>
                <Image source={require('../Images/logo.jpeg')} style={{width:70,height:70,top:100}}/>
                <Text style={styles.resetText}>Reset Password</Text>
                <View style={{top: 170}}>
                    <View style={{flexDirection:'row'}}><Text style={{fontSize:15}}>Enter new password</Text><Text style={{color: 'red'}}>*</Text></View>
                    <TextInput
                        placeholder="Enter new password"
                        secureTextEntry={true}
                        style={styles.email}
                        onChangeText={(newpassw) => this.setState({newPassword: newpassw})}
                    />
                </View>
                <View style={{top: 220}}>
                <View style={{flexDirection:'row'}}><Text style={{fontSize:15}}>Enter confirm password</Text><Text style={{color: 'red'}}>*</Text></View>
                    <TextInput
                        placeholder="Enter confirm password"
                        secureTextEntry={true}
                        style={styles.email}
                        onChangeText={(confirm) => this.setState({confirmPassword: confirm})}
                    />
                </View>
                <View style={{alignItems:'center'}}>
                {this.state.buttonFade && 
                    <View style={styles.buttonFade} >
                        <Text style={styles.buttonText}>Submit</Text>
                    </View>
                }
                {this.state.button &&
                    <TouchableOpacity onPress={() => reset()} style={styles.button} >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                }
                
                </View>
            </View>
        );

    }        
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
    },
    resetText: {
        fontSize: 30,
        fontWeight: '800',
        color:'#000',
        top: 120
    },
    email: {
        color: '#000',
        width: 300,
        backgroundColor:'#d6d6d4',
        top: 20,
        borderRadius: 10
    },
    button: {
        borderRadius: 5,
        backgroundColor:'#007aff',
        width: 300,
        height: 60,
        top: 270,
        justifyContent: 'center',
        alignItems:'center'
    },
    buttonFade: {
        borderRadius: 5,
        backgroundColor:'#599feb',
        width: 300,
        height: 60,
        top: 270,
        justifyContent: 'center',
        alignItems:'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight:'700'
    }

})