import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';
import { MarkersFactory } from '../../../core/factories/markersFactories';
import { PlacesService } from '../../../core/services.js/places';

export default class ObjectsOnMap extends Component {
    
    markersFactory = new MarkersFactory();
    placesService;

    constructor(props) {
        super(props);
        console.log('Func',props.onMarkerSelect);
        this.state = {
            places: []
        }
    }

    componentDidMount() {
        this.placesService = PlacesService.getInstance();
		this.placesService.getPlaces().then(
				(documents) => {
                    this.setState({places: documents.docs});
				}
			);
   }
    
	clickMarker = (e) => {
        console.log('Event');
		this.props.onMarkerSelect(e.nativeEvent);
    }

    render() {
        let places = [];
        if (this.state.places !== []) {
            places = this.state.places.map(
                (place) => {
                    console.log('Place',place.data().location);
                    return (<Marker
                                identifier={place.data().id.toString()}
                                onPress={this.clickMarker}
                                key={place.data().name}
                                coordinate= {{
                                    latitude: place.data().location.latitude,
                                    longitude: place.data().location.longitude}}
                                description= {place.data().type}
                                title={place.data().name}>
                            </Marker>);
                }
            );
        }
        
        return places;
    }
}

ObjectsOnMap.propTypes = {
    onMarkerSelect: PropTypes.func
};