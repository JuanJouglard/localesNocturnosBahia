/* eslint-disable react/display-name */
import firestore from '@react-native-firebase/firestore';
import Place from '../models/place';
import Event from '../models/event';
export class PlacesService {
  singletonInstance;

  getPlaces() {
    return this.makeRequest('Places');
  }

  getEvents() {
    return this.makeRequest('Events');
  }

  makeRequest(collection) {
    return firestore()
      .collection(collection)
      .get()
      .then(response => response.docs)
      .then(this.handleCollection(collection));
  }

  handleCollection = collection => documents => {
    const documentsData = documents.map(this.extractData);
    return new Promise(resolve => {
      const processedArray = documentsData.map(this.createObject(collection));
      resolve(processedArray);
    });
  };

  createObject = collection => item => {
    if (collection === 'Places') return new Place(item);
    else return new Event(item);
  };

  extractData(item) {
    return item.data();
  }

  getPlaceById(id) {
    return firestore()
      .collection('Places')
      .where('id', '==', id)
      .get()
      .then(response => response.docs[0]);
  }

  static getInstance() {
    // eslint-disable-next-line eqeqeq
    if (this.singletonInstance == null)
      this.singletonInstance = new PlacesService();
    return this.singletonInstance;
  }
}
