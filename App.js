import React, { Component } from 'react';
import { GoogleSignin } from 'react-native-google-signin';
import { firebase } from '@react-native-firebase/auth';
import Main from './src/core/components/Main/Main';
export default class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
  }


  componentDidMount() {
    this.googleLogin();
    firebase.auth().onAuthStateChanged((user) => {
      if (user)
        this.setState({isLoggedIn: true});
    });
  }

  async componentWillUnmount() {
    await firebase.auth().signOut();
    await GoogleSignin.signOut();
  }


  async googleLogin() {
    try {
      GoogleSignin.configure({
        offlineAccess: true,
        webClientId: '710418825047-olbh8tqc7vb3fkdv8bkso7sdu3npkvpe.apps.googleusercontent.com'
      });
  
      const userData = await GoogleSignin.signIn();
      const credential = firebase.auth.
      GoogleAuthProvider.credential(userData.idToken, userData.accessToken);
      console.log('Credential',credential);
      const user=await firebase.auth().signInWithCredential(credential);
      console.log('isNewUser',user);
    } catch (e) {
      console.log('error');
      console.error(e);
    }
  }

  render() {
    if (this.state.isLoggedIn)
      return <Main></Main>;
    else
      return null;
  }
} 

/**/
