/* eslint-disable react/display-name */
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {PlaceItem} from '../../shared/components/listItems/listItem';
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
      .then(this.handleCollection);
  }

  handleCollection = documents => {
    const documentsData = documents.map(this.extractData);
    return new Promise(resolve => {
      documentsData.forEach(this.renderPlaceListItem);
      resolve(documentsData);
    });
  };

  extractData(item) {
    return item.data();
  }

  renderEventListItem(event) {
    event.renderItem = function() {
      return <PlaceItem item={this}></PlaceItem>;
    };
  }

  renderPlaceListItem(place) {
    place.renderItem = function() {
      return <PlaceItem item={this}></PlaceItem>;
    };
  }

  getActiveAssistance(userId) {
    const assistancePromise = firestore()
      .collection('Attendance')
      .where('userId', '==', userId)
      .get()
      .then(response => response.docs);
    const placesPromise = assistancePromise.then(actives => {
      const placesId = actives.map(doc => doc.data().placeID);
      return firestore()
        .collection('Places')
        .get()
        .then(response => response.docs);
    });
    return Promise.all([assistancePromise, placesPromise]);
  }

  getMultiplePlaces(placesId) {
    const query = this.buildQueryForPlaces(
      placesId,
      firestore().collection('Places'),
    );
    console.log(query);
    return query
      .get()
      .then(response => response)
      .then(console.log);
  }

  buildQueryForPlaces(placesIds, query) {
    console.log(placesIds);
    if (placesIds.length === 0) return query;
    else {
      let lastId = placesIds.pop();
      console.log('lastID', lastId);
      return this.buildQueryForPlaces(
        placesIds,
        query.where('id', '==', lastId),
      );
    }
  }

  static getInstance() {
    // eslint-disable-next-line eqeqeq
    if (this.singletonInstance == null)
      this.singletonInstance = new PlacesService();
    return this.singletonInstance;
  }
}
