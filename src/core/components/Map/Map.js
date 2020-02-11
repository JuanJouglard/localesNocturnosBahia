//@ts-check
import React, {Component} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import PropTypes from 'prop-types';
import {
  CustomMap,
  ListOfEntries,
  PlacesService,
  SearchInput,
  FilterService,
} from '../../../shared/';

export default class Map extends Component {
  mapConfiguration = {
    mapType: 'standard',
    showsTraffic: true,
    showsUserLocation: true,
  };
  placesService;
  filterService;
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
    this.placesService = PlacesService.getInstance();
    this.filterService = FilterService.getInstance();
  }

  componentDidMount() {
    this.placesService.getPlaces().then(documents => {
      this.setState({initialMarkers: documents, markers: documents});
    });
  }

  selectMarker = marker => {
    this.props.navigation.navigate('Local', {
      item: marker,
    });
  };

  filterPlaces = text => {
    this.setState(prevState => {
      return {
        places: this.filterService.filter(
          prevState.initialMarkers,
          'name',
          text,
        ),
        searchText: text,
      };
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
      3000,
    );
    this.setState({
      searchText: '',
    });
  };

  typeAheadList = () => {
    if (this.state.searchText.length > 1)
      return (
        <View>
          <ListOfEntries
            onEntryPress={this.navigateToMarker}
            list={this.state.places}></ListOfEntries>
        </View>
      );
  };

  watchUserPosition() {
    Geolocation.watchPosition(position => {
      this.setState({region: position.coords});
    });
  }

  render() {
    this.watchUserPosition();
    return this.state.region.longitude !== null ? (
      <View style={styles.mapContainer}>
        <SearchInput
          section="Locales"
          onInput={this.filterPlaces}></SearchInput>
        {this.typeAheadList()}
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
    ) : null;
  }
}

Map.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  mapView: {
    flex: 4,
    zIndex: 0,
  },
});
