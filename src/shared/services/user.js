import {firebase} from '@react-native-firebase/auth';

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
}
