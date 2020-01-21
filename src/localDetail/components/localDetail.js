//@ts-check
import React, {Component} from 'react';
import {Image, Linking, Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import DetailHeader from './headerLocalDetail/headerDetail';
import * as images from '../../core/images/images';
import {faWifi} from '@fortawesome/free-solid-svg-icons';
import CustomMap from '../../shared/components/map/customMap';
import CreditCards from './cards';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class LocalDetail extends Component {
  static navigationOptions = props => {
    return {
      header: () => (
        <DetailHeader
          goBack={props.navigation.goBack}
          item={props.navigation.getParam('item')}></DetailHeader>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      item: props.navigation.getParam('item'),
    };
  }

  noop() {}

  render() {
    return (
      <View style={style.container}>
        <View style={style.mainInformation}>
          <Image
            style={style.typeImage}
            source={images[this.state.item.type + 'IMAGE']}></Image>
          <Text style={style.friendlyType}>{this.state.item.friendlyType}</Text>
        </View>
        <Text style={style.address}>{this.state.item.address}</Text>
        {this.hasWifi()}
        <View>
          <View style={style.cardsContainer}>
            <CreditCards
              acceptedCreditCards={
                this.state.item.acceptedCreditCards
              }></CreditCards>
          </View>
        </View>
        <TouchableOpacity onPress={this.goToInstagram}>
          <FontAwesomeIcon icon={faInstagram} size={32}></FontAwesomeIcon>
        </TouchableOpacity>
        <CustomMap
          onMarkerSelect={this.noop}
          layout={{
            height: 125,
            width: '80%',
          }}
          markers={[this.state.item]}
          region={{
            latitude: this.state.item.location.latitude,
            latitudeDelta: 0.007,
            longitude: this.state.item.location.longitude,
            longitudeDelta: 0.007,
          }}></CustomMap>
      </View>
    );
  }

  hasWifi() {
    if (this.state.item.hasWiFi)
      return <FontAwesomeIcon size={32} icon={faWifi}></FontAwesomeIcon>;
    else return null;
  }

  goToInstagram = () => {
    Linking.openURL(this.state.item.instagramAccount);
  };
}

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
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-around',
  },
  friendlyType: {
    fontFamily: 'Roboto',
    fontSize: 20,
  },
  mainInformation: {
    alignItems: 'center',
    flexDirection: 'row',
    fontSize: 24,
  },
  typeImage: {
    height: 75,
    width: 75,
  },
});

LocalDetail.propTypes = {
  navigation: PropTypes.object.isRequired,
};
