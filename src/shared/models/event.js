import AppItem from './appItem';
import EventDetail from '../components/details/eventDetail';
import React from 'react';
import PlacesService from '../services/places';
import AttendanceService from '../../localDetail/services/attendance';
export default class Event extends AppItem {
  placeId;
  startDate;
  endDate;
  placesService;
  attendanceService;
  place;
  people;

  constructor(item) {
    super(item);
    this.placesService = PlacesService.getInstance();
    this.placesService
      .getPlaceById(this.placeId)
      .then(place => (this.place = place.data()));

    this.attendanceService = AttendanceService.getInstance();
  }
  renderDetail(navigation) {
    return (
      <EventDetail
        item={this}
        place={this.place}
        navigation={navigation}></EventDetail>
    );
  }

  refreshAttendance() {
    if (this.id)
      return this.attendanceService
        .getEventAttendance(this.id)
        .then(attendance => (this.people = attendance));
  }
}
