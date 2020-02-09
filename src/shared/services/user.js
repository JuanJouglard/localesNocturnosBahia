import {firebase} from '@react-native-firebase/auth';
import Geolocation from 'react-native-geolocation-service';

export default class UserService {
  instance;

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
}
