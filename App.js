import React, {Component} from 'react';
import {firebase} from '@react-native-firebase/auth';
import Main from './src/core/components/Main/Main';
import {UserService} from './src/shared';
export default class App extends Component {
  userService;
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
    this.userService = UserService.getInstance();
  }

  componentDidMount() {
    this.userService.logIn();
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isLoggedIn: !!user});
    });
  }

  render() {
    if (this.state.isLoggedIn) return <Main></Main>;
    else return null;
  }
}
