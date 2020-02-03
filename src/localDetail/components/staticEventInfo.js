import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import InformationDetail from '../components/informationEntry';
import {PlacesService} from '../../shared/services/places';
import SocialNetworks from './socialNetworks';
import {faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons';

export default class StaticEventInfo extends Component {
  placesService;

  constructor(props) {
    super(props);
    this.placesService = PlacesService.getInstance();
    this.state = {
      eventsPlace: null,
    };
  }

  async componentDidMount() {
    const place = await this.placesService.getPlaceById(this.props.item.place);
    this.setState({eventsPlace: place.data()});
  }

  render() {
    return (
      <View style={[style.mainInformation]}>
        <Text style={style.text}>{this.state.eventsPlace?.name}</Text>
        <TouchableOpacity onPress={this.navigateToPlace}>
          <InformationDetail
            icon={faMapMarkedAlt}
            information={this.state.eventsPlace?.address}
            size={20}></InformationDetail>
        </TouchableOpacity>
        <SocialNetworks
          instagram={this.state.eventsPlace?.instagramAccount}
          facebook={'www.facebook.com'}></SocialNetworks>
      </View>
    );
  }

  navigateToPlace = () => {
    this.openURL(
      `https://www.google.com/maps/@?api=1&map_action=map&center=${this.state.eventsPlace.location.latitude},${this.state.eventsPlace.location.longitude}&zoom=20`,
    );
  };
}

const style = StyleSheet.create({
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  friendlyType: {
    fontFamily: 'Roboto',
    fontSize: 20,
  },
  mainInformation: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
    width: '100%',
  },
  text: {
    fontFamily: 'Roboto-Light',
    fontSize: 22,
  },
});

StaticEventInfo.propTypes = {
  item: PropTypes.object,
};
