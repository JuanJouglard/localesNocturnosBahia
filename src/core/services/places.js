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
    return new Promise((resolve, _) => {
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

  static getInstance() {
    // eslint-disable-next-line eqeqeq
    if (this.singletonInstance == null)
      this.singletonInstance = new PlacesService();
    return this.singletonInstance;
  }
}
