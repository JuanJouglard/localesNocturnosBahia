import {MarkerForMap} from '../models/marker';

export default class MarkersFactory {
  instance;

  static getInstance() {
    if (!this.instance) this.instance = new MarkersFactory();
    return this.instance;
  }

  createMarker(marker) {
    return new MarkerForMap(marker);
  }
}
