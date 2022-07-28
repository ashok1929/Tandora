import React,{Component} from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'

export default class UploadProfile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity>
                            <Ionicons
                                name="close-outline"
                                size={35}
                                color="#000"
                            /> 
                        </TouchableOpacity>
                        <Text style={styles.profile}>Edit Profile</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => makePost()} style={styles.postButton}>
                            <Text style={{color:'#fff'}}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profile: {
        fontSize: 17,
        color:'#000'
    },
})