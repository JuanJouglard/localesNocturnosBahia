import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import {firebase} from '@react-native-firebase/auth';

export default class AttendanceService {
  static instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new AttendanceService();
    }
    return this.instance;
  }

  async registerAttendance(placeId, startTime, endTime) {
    return firestore()
      .collection('Attendance')
      .add({
        endTime: endTime,
        placeID: placeId,
        startTime: startTime,
        userId: firebase.auth().currentUser.uid,
      });
  }

  registerAttendanceToEvent(eventId) {
    return firestore()
      .collection('AttendanceEvents')
      .add({
        eventId: eventId,
        userId: firebase.auth().currentUser.uid,
      });
  }

  async removeAssitance(id) {
    return firestore()
      .collection('Attendance')
      .doc(id)
      .delete();
  }

  getActiveAttendance(userId) {
    return functions()
      .httpsCallable('getActiveAttendance')({
        userId: userId,
      })
      .catch(console.log);
  }
}
