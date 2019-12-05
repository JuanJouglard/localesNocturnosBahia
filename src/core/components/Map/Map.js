
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import ObjectsOnMap from '../../../shared/components/objectsOnMap/objectsOnMap';
import { customStyle } from '../../configurations/map/customStyle';

export default class Map extends Component {

    mapConfiguration = {
		mapType: 'standard',
		showsTraffic: true,
        showsUserLocation: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            latitudeDelta: 0.0922,
            longitude: null,
			longitudeDelta: 0.0421,
			selectedMarker: 'Hola'
        }
	}

	

	selectMarker = (marker) => {
		this.setState({selectedMarker: marker.id});
	}
    
    render() {
        Geolocation.watchPosition(
            (position) => {
                this.setState({...position.coords});
            }
        );
        return this.state.longitude !== null ? (
			<View style={styles.mapContainer}>
				<MapView
					style={styles.mapView}
					{...this.mapConfiguration}
					region = {this.state}
					customMapStyle= {customStyle}
				>
					<ObjectsOnMap onMarkerSelect={this.selectMarker}>
					</ObjectsOnMap>
				</MapView>
				<View style={styles.locationInformation}>
					<Text>{this.state.selectedMarker}</Text>
				</View>
			</View>
        ): <Text>No  Coords</Text>;
    }
}

const styles = StyleSheet.create({
	locationInformation: {
		flex: 2
	},
	mapContainer: {
		flex: 1,
	},
    mapView: {
		flex: 4,
    }
});
    