import AppItem from './appItem';
import PlaceDetail from '../components/details/placeDetail';
import React from 'react';
import AttendanceService from '../../localDetail/services/attendance';
export default class Place extends AppItem {
  location;
  acceptedCreditCards;
  address;
  instagramAccount;
  legalAge;
  maxOccupancy;
  attendance;
  attendanceService;

  constructor(item) {
    super(item);
    this.attendanceService = AttendanceService.getInstance();
  }

  renderDetail(navigation) {
    return <PlaceDetail item={this} navigation={navigation}></PlaceDetail>;
  }

  refreshAttendance(date) {
    if (this.id)
      return this.attendanceService
        .getPlaceAttendance(this.id, date)
        .then(
          attendance =>
            (this.attendance = +(attendance / this.maxOccupancy).toFixed(2)),
        );
  }
}
