import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';
import { MarkersFactory } from '../../../core/factories/markersFactories';

export default class ObjectsOnMap extends Component {
    
    markersFactory = new MarkersFactory();

    constructor(props) {
        super(props);
    }
    
	clickMarker(e) {
        console.log(e.nativeEvent);
		this.props.onMarkerSelect(e.nativeEvent);
    }

    render() {
        return (
                <Marker
                    {...this.markersFactory.markersForMap()}
                    onPress={this.clickMarker}>
                </Marker>
        );
    }
}

ObjectsOnMap.propTypes = {
    onMarkerSelect: PropTypes.func
};