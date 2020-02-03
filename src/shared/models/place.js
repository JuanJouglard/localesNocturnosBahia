import AppItem from './appItem';
import PlaceDetail from '../components/details/placeDetail';
import React from 'react';
export default class Place extends AppItem {
  location;
  acceptedCreditCards;
  address;
  instagramAccount;
  legalAge;

  renderDetail() {
    return <PlaceDetail item={this}></PlaceDetail>;
  }
}
