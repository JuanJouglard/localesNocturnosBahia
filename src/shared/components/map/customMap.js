import React, {Component} from 'react';
import {Image, Text} from 'react-native';
import * as images from '../../../core/images/images';
import MapView, {Marker} from 'react-native-maps';
import PropTypes from 'prop-types';
import {customStyle} from '../../../core/configurations/map/customStyle';
import {MarkersFactory} from '../../services/markersFactory';
export default class CustomMap extends Component {
  mapConfiguration = {
    mapType: 'standard',
    showsTraffic: true,
    showsUserLocation: true,
  };

  markersFactory;

  constructor(props) {
    super(props);
    this.markersFactory = MarkersFactory.getInstance();
  }

  render() {
    return (
      <MapView
        {...this.mapConfiguration}
        customMapStyle={customStyle}
        style={this.props.layout}
        region={this.props.region}>
        {this.getMarkers()}
      </MapView>
    );
  }

  clickMarker = marker => () => {
    this.props.onMarkerSelect(marker);
  };

  getMarkers() {
    return this.props.markers.map(marker => {
      return this.markersFactory
        .createMarker({clickMarker: this.clickMarker(marker), ...marker})
        .render();
    });
  }
}

CustomMap.propTypes = {
  layout: PropTypes.object,
  markers: PropTypes.array,
  onMarkerSelect: PropTypes.func,
  region: PropTypes.object,
};
