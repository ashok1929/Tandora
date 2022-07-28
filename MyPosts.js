import React,{Component} from "react";
import {View,Text,StyleSheet,TouchableOpacity,FlatList,Image, Dimensions} from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";


export default class MyPosts extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataurl: [],
        }
    }

    componentDidMount() {



        const show = async () => {
            /*           

            var urldata = [];

            await axios.get('https://spreadora2.herokuapp.com/api/upload/files/')
            .then(res => {
                for(let i=res.data.length-1;i>=0;i--) {
                    urldata.push({title:"https://spreadora2.herokuapp.com"+res.data[i].url})
                   // urldata['title'] = "https://spreadora2.herokuapp.com"+res.data[i].url;
                    
                }
                //console.log(res.data[0].url)
            })
            .catch((e) => console.log(e))
            this.state.data.push(urldata)
            this.setState({dataurl: this.state.data})
        }

        */


        let usrdata = await AsyncStorage.getItem('user');
        let user = JSON.parse(usrdata);

        await axios.get('https://spreadora2.herokuapp.com/api/posts',{
            headers: {
                "Authorization": `Bearer ${user.jwt}`
            }
        })
        .then((res) => {
            var urls = []
            //console.log(res.data.data[3].attributes.username)
            for(var i=0;i<res.data.data.length;i++) {
                if(res.data.data[i].attributes.username == user.username){
                    urls.push({url: res.data.data[i].attributes.imageURL,desc:res.data.data[i].attributes.description,date:res.data.data[i].attributes.date,time:res.data.data[i].attributes.time})
                }
            }
            this.setState({data: urls})
            console.log(this.state.data)
        })
        .catch((e) => console.log(e))

    }
    show();

   


}


    render() {


        const Item = ({ url,desc,time,date }) => (
            
            <View style={{padding:5}}>
                <TouchableOpacity>
                    <Image
                        source={{uri: "https://spreadora2.herokuapp.com"+url}}
                        style={{width:Dimensions.get('window').width,height:200,resizeMode:'contain'}}
                    />
               </TouchableOpacity>
               <View style={{height:50,justifyContent:'center',margin:10}}>
                    <Text style={styles.desc}>{desc}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',top:5,bottom:5}}>
                        <Text style={styles.date}>{date}</Text>
                        <Text style={styles.time}>{time}</Text>
                    </View>
               </View>
            </View>
          );


        const renderItem = ({ item }) => {
            return(
                <Item
                    url={item.url}
                    desc={item.desc}
                    time={item.time}
                    date={item.date}
                />
            );
            
            
          };
         

        return(
            <View style={styles.container}>
                <View style={{height:50,backgroundColor:'#2ca7e0',width:'100%',justifyContent:'center'}}>
                    <Text style={{color:'#fff',fontWeight:'800',fontSize:20,left:20}}>My Posts</Text>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={renderItem}
                />
                
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    desc: {
        fontSize:17,
        fontWeight: '700',
        color: '#000'
    }
});