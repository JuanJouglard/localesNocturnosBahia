import {firebase} from '@react-native-firebase/auth';
import Geolocation from 'react-native-geolocation-service';
import {GoogleSignin} from 'react-native-google-signin';
export default class UserService {
  static instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  getCurrentLoggedUser() {
    return firebase.auth().currentUser;
  }

  getUserLocation(callback) {
    return Geolocation.getCurrentPosition(callback);
  }

  logOut() {
    return Promise.all([GoogleSignin.signOut(), firebase.auth().signOut()]);
  }

  async logIn() {
    try {
      GoogleSignin.configure({
        offlineAccess: true,
        webClientId:
          '710418825047-olbh8tqc7vb3fkdv8bkso7sdu3npkvpe.apps.googleusercontent.com',
      });

      const userData = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userData.idToken,
        userData.accessToken,
      );
      await firebase.auth().signInWithCredential(credential);
    } catch (e) {
      console.log('error');
      console.error(e);
    }
  }
}
