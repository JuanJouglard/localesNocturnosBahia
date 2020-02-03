//@ts-check
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import PropTypes from 'prop-types';
import CustomMap from '../../../shared/components/map/customMap';
import {PlacesService} from '../../../shared/services/places';

export default class Map extends Component {
  mapConfiguration = {
    mapType: 'standard',
    showsTraffic: true,
    showsUserLocation: true,
  };
  placesService;

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      region: {
        latitude: null,

        longitude: null,
      },
    };
  }

  componentDidMount() {
    this.placesService = PlacesService.getInstance();
    this.placesService.getPlaces().then(documents => {
      this.setState({markers: documents});
    });
  }

  selectMarker = marker => {
    this.props.navigation.navigate('Local', {
      item: marker,
    });
  };

  render() {
    Geolocation.watchPosition(position => {
      this.setState({region: position.coords});
    });
    return this.state.region.longitude !== null ? (
      <View style={styles.mapContainer}>
        <CustomMap
          style={styles.mapView}
          layout={{flex: 4}}
          region={{
            latitude: this.state.region.latitude,
            latitudeDelta: 0.0922,
            longitude: this.state.region.longitude,

            longitudeDelta: 0.0421,
          }}
          markers={this.state.markers}
          onMarkerSelect={this.selectMarker}></CustomMap>
      </View>
    ) : (
      <Text>No Coords</Text>
    );
  }
}

Map.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  locationInformation: {
    flex: 2,
  },
  mapContainer: {
    flex: 1,
  },
  mapView: {
    flex: 4,
  },
});
