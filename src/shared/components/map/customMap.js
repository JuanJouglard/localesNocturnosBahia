import React, {Component} from 'react';
import {Image} from 'react-native';
import * as images from '../../../core/images/images';
import MapView, {Marker} from 'react-native-maps';
import PropTypes from 'prop-types';
import {customStyle} from '../../../core/configurations/map/customStyle';
export default class CustomMap extends Component {
  mapConfiguration = {
    mapType: 'standard',
    showsTraffic: true,
    showsUserLocation: true,
  };

  constructor(props) {
    super(props);
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
      return (
        <Marker
          identifier={marker.id.toString()}
          onPress={this.clickMarker(marker)}
          key={marker.name}
          coordinate={{
            latitude: marker.location.latitude,
            longitude: marker.location.longitude,
          }}
          description={marker.friendlyType}
          title={marker.name}>
          <Image
            source={images[marker.type + 'IMAGE']}
            style={{
              height: 32,
              width: 32,
            }}></Image>
        </Marker>
      );
    });
  }
}

CustomMap.propTypes = {
  layout: PropTypes.object,
  markers: PropTypes.array,
  onMarkerSelect: PropTypes.func,
  region: PropTypes.object,
};
