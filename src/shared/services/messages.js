export default class MessagesService {
  instance;

  static getInstance() {
    if (!this.instance) this.instance = new MessagesService();
    return this.instance;
  }

  getRegistrationMessage(placeName, startTime, endTime) {
    // eslint-disable-next-line max-len
    return `Esta seguro/a que quiere confirmar la asistencia a ${placeName} desde las ${startTime.toLocaleTimeString()}  del ${startTime.toLocaleDateString()}  hasta las  ${endTime.toLocaleTimeString()} del ${endTime.toLocaleDateString()}?`;
  }

  getConfirmationMessageForEvent(eventName) {
    return `Esta seguro/a que quiere confirmar la asistencia a ${eventName}`;
  }

  getDeleteMessageForEvent(eventName) {
    return `Esta seguro/a que quiere remover la asistencia a ${eventName}`;
  }

  getDeleteMessage(placeName) {
    return `Esta seguro/a que quiere remover la asistencia a ${placeName}`;
  }
}
