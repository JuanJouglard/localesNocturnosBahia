import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import {firebase} from '@react-native-firebase/auth';
import {UserService} from '../../shared';
export default class AttendanceService {
  static instance;
  userService;

  constructor() {
    this.userService = UserService.getInstance();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new AttendanceService();
    }
    return this.instance;
  }

  async registerAttendance(placeId, placeName, startTime, endTime) {
    return firestore()
      .collection('Attendance')
      .add({
        endTime: endTime,
        name: placeName,
        placeId: placeId,
        startTime: startTime,
        userId: firebase.auth().currentUser.uid,
      });
  }

  registerAttendanceToEvent(eventId, eventName) {
    return firestore()
      .collection('AttendanceEvents')
      .add({
        eventId: eventId,
        name: eventName,
        userId: this.userService.getCurrentLoggedUser().uid,
      });
  }

  async removeAssitance(id) {
    return firestore()
      .collection('Attendance')
      .doc(id)
      .delete();
  }

  getActiveAttendance(userId) {
    const placesAttendance = firestore()
      .collection('Attendance')
      .where('userId', '==', userId)
      .get();
    const eventsAttendance = firestore()
      .collection('AttendanceEvents')
      .where('userId', '==', userId)
      .get();
    return Promise.all([placesAttendance, eventsAttendance]);
  }

  getActiveAttendanceByUserAndPlace(placeId) {
    const userId = this.userService.getCurrentLoggedUser().uid;
    return firestore()
      .collection('Attendance')
      .where('userId', '==', userId)
      .where('placeId', '==', placeId)
      .get();
  }

  getEventAttendance(id) {
    return firestore()
      .collection('AttendanceEvents')
      .where('eventId', '==', id)
      .get()
      .then(response => response.docs.length);
  }

  getEventAttendanceByUserId(eventId) {
    const userId = this.userService.getCurrentLoggedUser().uid;
    return firestore()
      .collection('AttendanceEvents')
      .where('eventId', '==', eventId)
      .where('userId', '==', userId)
      .get();
  }

  getPlaceAttendance(id, date) {
    return functions()
      .httpsCallable('getOccupancyByHour')({
        date: date,
        placeID: id,
      })
      .then(response => response.data.occupancy);
  }
}
