import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import ActiveAssistance from './activeAssistance';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    this.setState({currentUser: firebase.auth().currentUser});
  }

  render() {
    if (this.state.currentUser)
      return (
        <View style={{flex: 1}}>
          <View style={style.layout}>
            <Image
              style={style.profilePicture}
              source={{uri: this.state.currentUser.photoURL}}></Image>
            <View style={style.userInfo}>
              <Text style={style.profileName}>
                {this.state.currentUser.displayName}
              </Text>
              <Text style={style.emailText}>
                {this.state.currentUser.email}
              </Text>
            </View>
          </View>
          <View style={style.actives}>
            <Text style={style.textTitle}>Registros Activos</Text>
            <ActiveAssistance
              // eslint-disable-next-line react/prop-types
              navigation={this.props.navigation}></ActiveAssistance>
          </View>
        </View>
      );
    else return false;
  }
}

const profileSize = 120;

const style = StyleSheet.create({
  actives: {
    flex: 5,
  },
  emailText: {
    fontFamily: 'Roboto-Light',
    fontSize: 20,
  },
  layout: {
    alignItems: 'center',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profileName: {
    fontFamily: 'Roboto-Light',
    fontSize: 25,
  },
  profilePicture: {
    borderRadius: profileSize / 2,
    height: profileSize,
    width: profileSize,
  },
  textTitle: {
    alignSelf: 'center',
    fontFamily: 'Roboto-Italic',
    fontSize: 24,
    padding: 16,
  },
  userInfo: {
    height: profileSize,
    justifyContent: 'space-evenly',
  },
});
