import {Alert} from 'react-native';

export default class AlertsService {
  instance;

  static getInstance() {
    if (!this.instance) this.instance = new AlertsService();
    return this.instance;
  }

  showConfirmationDialog(title, message, confirmationBehavior) {
    Alert.alert(title, message, [
      {text: 'Cancelar'},
      {onPress: confirmationBehavior, text: 'Confirmar'},
    ]);
  }
}
