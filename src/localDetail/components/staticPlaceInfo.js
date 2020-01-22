import React, {Component} from 'react';
import {Linking, StyleSheet, View, TouchableOpacity} from 'react-native';
import CreditCards from './cards';
import InformationDetail from './informationEntry';
import SocialNetworks from './socialNetworks';
import {faPhone, faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons';
import {PropTypes} from 'prop-types';

export default class StaticInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.mainInformation}>
        <TouchableOpacity onPress={this.navigateToPlace}>
          <InformationDetail
            icon={faMapMarkedAlt}
            information={this.props.item.address}
            size={20}></InformationDetail>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.callNumber}>
          <InformationDetail
            icon={faPhone}
            information={'4500000'}
            size={20}></InformationDetail>
        </TouchableOpacity>
        <View style={style.cardsContainer}>
          <CreditCards
            acceptedCreditCards={
              this.props.item.acceptedCreditCards
            }></CreditCards>
        </View>
        <SocialNetworks
          instagram={this.props.item.instagramAccount}
          facebook={'www.facebook.com'}></SocialNetworks>
      </View>
    );
  }

  openURL = url => {
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    });
  };

  goToInstagram = () => {
    this.openURL(this.props.item.instagramAccount);
  };

  goToFacebook = () => {
    this.openURL('www.facebook.com');
  };

  callNumber = () => {
    this.openURL('tel:4500000');
  };

  navigateToPlace = () => {
    this.openURL(
      `https://www.google.com/maps/@?api=1&map_action=map&center=${this.props.item.location.latitude},${this.props.item.location.longitude}&zoom=20`,
    );
  };
}

StaticInfo.propTypes = {
  item: PropTypes.object,
};

const style = StyleSheet.create({
  address: {
    fontFamily: 'Roboto-Light',
    fontSize: 22,
  },
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});
