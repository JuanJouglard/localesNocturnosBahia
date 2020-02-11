import React, {Component} from 'react';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import {customStyle} from '../../../core/configurations/map/customStyle';
import MarkersFactory from '../../services/markersFactory';
export default class CustomMap extends Component {
  mapConfiguration = {
    mapType: 'standard',
    showsTraffic: false,
    showsUserLocation: true,
  };

  markersFactory;
  mapRef;

  constructor(props) {
    super(props);
    this.markersFactory = MarkersFactory.getInstance();
    this.state = {
      places: props.markers,
      searchText: '',
    };
  }

  render() {
    return (
      <MapView
        {...this.mapConfiguration}
        ref={ref => this.props.mapRef(ref)}
        customMapStyle={customStyle}
        style={{flex: 1}}
        initialRegion={this.props.region}>
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
  mapRef: PropTypes.func,
  markers: PropTypes.array,
  onMarkerSelect: PropTypes.func,
  region: PropTypes.object,
};
