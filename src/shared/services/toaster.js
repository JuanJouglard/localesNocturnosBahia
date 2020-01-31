import {ToastAndroid} from 'react-native';

export default class ToasterService {
  instance;

  static getInstance() {
    if (!this.instance) this.instance = new ToasterService();
    return this.instance;
  }

  showToaster(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
}
