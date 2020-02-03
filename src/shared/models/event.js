import AppItem from './appItem';
import EventDetail from '../components/details/eventDetail';
import React from 'react';
import {PlacesService} from '../services/places';
export default class Event extends AppItem {
  placeId;
  startDate;
  endDate;
  placesService;
  place;

  constructor(item) {
    super(item);
    this.placesService = PlacesService.getInstance();
    this.placesService
      .getPlaceById(this.placeId)
      .then(place => (this.place = place.data()));
  }
  renderDetail() {
    return <EventDetail item={this}></EventDetail>;
  }
}
