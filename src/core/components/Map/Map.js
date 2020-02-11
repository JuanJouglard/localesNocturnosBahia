//@ts-check
import React, {Component} from 'react';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import PropTypes from 'prop-types';
import CustomMap from '../../../shared/components/map/customMap';
import {PlacesService} from '../../../shared/services/places';
import SearchInput from '../../../shared/components/searchInput/searchInput';
import ListOfEntries from '../../../shared/components/listOfEntries/listOfEntries';

export default class Map extends Component {
  mapConfiguration = {
    mapType: 'standard',
    showsTraffic: true,
    showsUserLocation: true,
  };
  placesService;
  mapRef;

  constructor(props) {
    super(props);
    this.state = {
      delta: {
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      },
      initialMarkers: [],
      markers: [],
      region: {
        latitude: null,
        longitude: null,
      },
      searchText: '',
    };
  }

  componentDidMount() {
    this.placesService = PlacesService.getInstance();
    this.placesService.getPlaces().then(documents => {
      this.setState({markers: documents});
      this.setState({initialMarkers: documents});
    });
  }

  selectMarker = marker => {
    this.props.navigation.navigate('Local', {
      item: marker,
    });
  };

  filterPlaces = text => {
    this.setState({
      places: this.state.initialMarkers.filter(item =>
        item.name.toUpperCase().startsWith(text.toUpperCase()),
      ),
      searchText: text,
    });
  };

  navigateToMarker = selectedItem => {
    Keyboard.dismiss();
    this.mapRef.animateToRegion(
      {
        latitude: selectedItem.location._latitude,
        latitudeDelta: 0.005,
        longitude: selectedItem.location._longitude,
        longitudeDelta: 0.005,
      },
      4000,
    );
    this.setState({
      searchText: '',
    });
  };

  render() {
    Geolocation.watchPosition(position => {
      this.setState({region: position.coords});
    });
    return this.state.region.longitude !== null ? (
      <View style={styles.mapContainer}>
        <SearchInput
          section="Locales"
          onInput={this.filterPlaces}></SearchInput>
        {(() => {
          if (this.state.searchText.length > 1)
            return (
              <View>
                <ListOfEntries
                  onEntryPress={this.navigateToMarker}
                  list={this.state.places}></ListOfEntries>
              </View>
            );
        })()}
        <View style={styles.mapView}>
          <CustomMap
            mapRef={map => (this.mapRef = map)}
            region={{
              ...this.state.region,
              ...this.state.delta,
            }}
            markers={this.state.markers}
            onMarkerSelect={this.selectMarker}></CustomMap>
        </View>
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
    zIndex: 0,
  },
});
