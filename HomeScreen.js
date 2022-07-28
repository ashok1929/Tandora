import React, { Component, Profiler } from 'react'
import { View, PermissionsAndroid } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation';
import Post from './Post';
import Nearby from './Nearyby';
import Trending from './Trending';
import ProfileScreen from './ProfileScreen';

const Tab = createMaterialBottomTabNavigator();

const More = () => {
  return (<View></View>)
}

const BuySell = () => {
  return (<View></View>)
}


export default class HomeScreen extends Component {


  componentDidMount() {




    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Location Permission',
            'message': 'This App needs access to your location ' +
              'so we can know where you are.'
          }
        )

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {


          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          })
            .then((data) => {
              console.log("Location flag " + data)
              Geolocation.getCurrentPosition((info) => {
                console.log(info)
              })
              

            })
            .catch((err) => {
              alert (err)
            });
          Geolocation.getCurrentPosition((info) => {
            console.log(info)

          })

        } else {
          console.log("Location permission denied")
        }
      } catch (err) {
        console.warn(err)
      }
    }

    requestLocationPermission().catch((e) => console.log(e))



  }



  render() {
    return (
      <Tab.Navigator
        initialRouteName='Login'
        activeColor="#2ca7e0"
        barStyle={{ backgroundColor: '#fff' }}>

        <Tab.Screen
          name='Nearby'
          component={Nearby}
          options={{
            tabBarLabel: 'Nearby',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="near-me" color={color} size={26} style={{ right: 3 }} />
            ),
          }}
        />


        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user-circle-o" color={color} size={26} style={{ right: 3 }} />
            ),
          }}
        />

      </Tab.Navigator>
    );
  }
}