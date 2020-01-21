import {Marker} from '../../shared/models/marker';

export class MarkersFactory {
  constructor() {}

  markersForMap() {
    return new Marker({
      coordinate: {
        latitude: -34.608527,
        longitude: -58.373786,
      },
      description: 'Example',
      draggable: true,
      title: 'Test',
    });
  }
}
