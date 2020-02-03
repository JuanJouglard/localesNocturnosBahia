import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import * as images from '../../../core/images/images';
import Assistance from '../../../localDetail/components/assistance';
import StaticInfo from '../../../localDetail/components/staticPlaceInfo';
import Occupancy from '../../../localDetail/components/Occupancy';

export default class LocalDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.container}>
        <ImageBackground
          imageStyle={style.typeImage}
          source={images[this.props.item.type + 'IMAGE']}
          style={style.background}>
          <View style={[style.info]}>
            <StaticInfo item={this.props.item}></StaticInfo>
          </View>
          <View style={style.separator}></View>
          <View style={style.occupancy}>
            <Occupancy progress={0.5}></Occupancy>
          </View>
          <View style={style.separator}></View>
          <View style={style.assistance}>
            <Assistance item={this.props.item}></Assistance>
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
  item: PropTypes.object.isRequired,
};
