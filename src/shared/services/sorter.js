import {getPreciseDistance} from 'geolib';
import UserService from './user';

export default class Sorter {
  instance;
  userService;

  constructor() {
    this.userService = UserService.getInstance();
  }

  static getSorter() {
    if (!this.instance) this.instance = new Sorter();
    return this.instance;
  }

  sortByLocation = places => {
    return new Promise((resolve, reject) => {
      this.userService.getUserLocation(location => {
        const sortedPlaces = places.sort(this.sortNearBy(location.coords));
        resolve(sortedPlaces);
      });
    });
  };

  sortNearBy = ({latitude, longitude}) => (first, second) => {
    return (
      getPreciseDistance(
        {latitude, longitude},
        {
          latitude: first.location.latitude,
          longitude: first.location.longitude,
        },
      ) -
      getPreciseDistance(
        {latitude, longitude},
        {
          latitude: second.location.latitude,
          longitude: second.location.longitude,
        },
      )
    );
  };
}
