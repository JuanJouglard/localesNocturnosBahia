import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Marker} from 'react-native-maps';
import {MarkersFactory} from '../../../core/factories/markersFactories';
import {PlacesService} from '../../../core/services.js/places';
import {Image} from 'react-native';
import * as images from '../../../core/images/images';

export default class ObjectsOnMap extends Component {
  markersFactory = new MarkersFactory();
  placesService;

  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    this.placesService = PlacesService.getInstance();
    this.placesService.getPlaces().then(documents => {
      this.setState({places: documents.docs});
    });
  }

  clickMarker = markerItem => () => {
    this.props.onMarkerSelect(markerItem);
  };

  render() {
    let places = [];
    if (this.state.places !== []) {
      places = this.state.places.map(place => {
        return (
          <Marker
            identifier={place.data().id.toString()}
            onPress={this.clickMarker(place.data())}
            key={place.data().name}
            coordinate={{
              latitude: place.data().location.latitude,
              longitude: place.data().location.longitude,
            }}
            description={place.data().type}
            title={place.data().name}>
            <Image
              source={images[place.data().type + 'IMAGE']}
              style={{
                height: 32,
                width: 32,
              }}></Image>
          </Marker>
        );
      });
    }

    return places;
  }
}

ObjectsOnMap.propTypes = {
  onMarkerSelect: PropTypes.func,
  zoomLevel: PropTypes.number,
};
