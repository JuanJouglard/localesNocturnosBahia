
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import { MarkersFactory } from '../../core/factories/markersFactories';

export default class Map extends Component {

    mapConfiguration = {
      mapType: 'standard',
      showsUserLocation: true,
      showsTraffic: true
    };

    markersFactory = new MarkersFactory();
    constructor(props) {
        super(props);
        this.state = {
              latitude: null,
              longitude: null,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
        }
    }
    
    render() {
      Geolocation.watchPosition(
        (position) => {
          this.setState({...position.coords});
        },
        console.log
      );
      return this.state.longitude !== null ? (
        <MapView
          style={styles.mapView}
          {...this.mapConfiguration}
          region = {this.state}
          onRegionChange = {console.log}
        >
          <Marker {...this.markersFactory.markersForMap()}></Marker>
      </MapView>
      ): <Text>No  Coords</Text>;
    }
}

const styles = StyleSheet.create({
    mapView: {
      flex: 1
    }
});
    