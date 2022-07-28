import React,{Component} from 'react'
import {View,Text} from 'react-native'

export default class ViewPhoto extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        console.log(this.props.imageURL)

        return(
            <View>
                <Text>HEllo</Text>
            </View>
        );

    }

}