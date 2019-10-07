
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { MarkersFactory } from '../../core/factories/markersFactories';
import { MapView, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

export default class Map extends Component {

    mapConfiguration = {
        mapType: 'standard',
		showsTraffic: true,
        showsUserLocation: true,
    };

    markersFactory = new MarkersFactory();
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            latitudeDelta: 0.0922,
            longitude: null,
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
    