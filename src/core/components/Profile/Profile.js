import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ActiveAssistance from './activeAssistance';
import {UserService} from '../../../shared/';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class Profile extends Component {
  userService;

  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
    this.userService = UserService.getInstance();
  }

  componentDidMount() {
    this.setState({currentUser: this.userService.getCurrentLoggedUser()});
  }

  logOut = () => {
    this.userService.logOut().then(this.userService.logIn);
  };

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
          <TouchableOpacity onPress={this.logOut}>
            <Text style={style.logOutButton}> Log out</Text>
          </TouchableOpacity>
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
    fontSize: 18,
  },
  layout: {
    alignItems: 'center',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  logOutButton: {
    alignSelf: 'center',
    backgroundColor: '#fc4646',
    borderRadius: 3,
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
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
    justifyContent: 'center',
  },
});
