import React,{Component} from 'react'
import {View,Text,TextInput,TouchableOpacity} from 'react-native'
import axios from 'axios';

export default class InsertDelete extends Component
{
    constructor() {
        super();
        this.state = {
            data: ''
        }
    }
    

    render() {

        const post = () => {

            if(this.state.data != '') {
                fetch('https://spreadora2.herokuapp.com/api/todos', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${jwt}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "data": {
                            "title": this.state.data,
                        }
                       
                        
                    })
                }).then(() => alert('Data inserted'))
                .catch((e) => alert(e))
            }

        }

        const get = () => {
            axios.get('https://spreadora2.herokuapp.com/api/todos')
            .then((res) => {
                const resData = JSON.stringify(res.data.data)
                alert(resData)
            })
            .catch((e) => console.log(e))
        }


        return(
            <View style={{flex:1}}>
                <TextInput
                    placeholder='Enter data'
                    onChangeText={(text) => this.setState({data: text})}
                />
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => post()} style={{backgroundColor: '#2ca7e0'}}><Text>Post data</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => get()} style={{backgroundColor: '#2ca'}}><Text>Get data</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}