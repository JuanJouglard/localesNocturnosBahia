import firestore from '@react-native-firebase/firestore';

export class PlacesService {
  singletonInstance;

  getPlaces() {
    return firestore()
      .collection('Places')
      .get();
  }

  static getInstance() {
    // eslint-disable-next-line eqeqeq
    if (this.singletonInstance == null)
      this.singletonInstance = new PlacesService();
    return this.singletonInstance;
  }
}
