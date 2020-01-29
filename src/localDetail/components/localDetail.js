//@ts-check
import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import DetailHeader from './headerLocalDetail/headerDetail';
import * as images from '../../core/images/images';
import Assistance from './assistance';
import StaticInfo from './staticPlaceInfo';
import Occupancy from './Occupancy';

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

  render() {
    return (
      <View style={style.container}>
        <ImageBackground
          imageStyle={style.typeImage}
          source={images[this.state.item.type + 'IMAGE']}
          style={style.background}>
          <View style={[style.info]}>
            <StaticInfo item={this.state.item}></StaticInfo>
          </View>
          <View style={style.separator}></View>
          <View style={style.occupancy}>
            <Occupancy progress={0.5}></Occupancy>
          </View>
          <View style={style.separator}></View>
          <View style={style.assistance}>
            <Assistance item={this.state.item}></Assistance>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const style = StyleSheet.create({
  assistance: {
    flex: 2,
  },
  background: {
    height: '100%',
    paddingTop: 20,
  },
  border: {
    borderColor: 'black',
    borderWidth: 5,
  },
  container: {
    height: '100%',
  },
  info: {
    flex: 1,
  },
  occupancy: {
    flex: 1,
  },
  separator: {
    borderColor: 'black',
    borderWidth: 0.55,
    margin: 15,
    marginBottom: 0,
    marginTop: 0,
  },
  typeImage: {
    opacity: 0.1,
    resizeMode: 'contain',
  },
});

LocalDetail.propTypes = {
  navigation: PropTypes.object.isRequired,
};
