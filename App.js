/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  View,
  Button
} from 'react-native';
import Map from './src/core/components/Map/Map';
import Home from './src/core/components/Home/Home';
import Profile from './src/core/components/Profile/Profile';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

class App extends Component {

  constructor(props) {
    super(props);
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )
  }

  render() {
    return (
      <View style={style.full}>
        <View  style={style.map}>
          <Map></Map>
        </View>
        <View style={style.navigation}>
          <Button title='HOME' style={style.button}/>
          <Button title='MAP' style={style.button}/>
          <Button title='PROFILE' style={style.button}/>
        </View>
      </View>
    )
  }
}

const tabNavigator = createBottomTabNavigator({
  Home: Home,
  Map: Map,
  Profile: Profile
});

const style = StyleSheet.create({
    full: {
      alignItems: 'stretch',
      flex:1
    },
    navigation: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
    },
    button: {
      flex: 1
    },
    map: {
      flex: 8
    }
});

export default createAppContainer(tabNavigator);
