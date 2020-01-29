import firestore from '@react-native-firebase/firestore';
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
}
