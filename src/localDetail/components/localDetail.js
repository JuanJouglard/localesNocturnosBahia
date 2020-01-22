//@ts-check
import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import DetailHeader from './headerLocalDetail/headerDetail';
import * as images from '../../core/images/images';
import Assistance from './assistance';
import StaticInfo from './staticPlaceInfo';

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
    console.log(this.state.item);
    return (
      <View style={style.container}>
        <ImageBackground
          imageStyle={style.typeImage}
          source={images[this.state.item.type + 'IMAGE']}
          style={style.background}>
          <StaticInfo item={this.state.item}></StaticInfo>
          <View style={style.separator}></View>
          <Assistance></Assistance>
        </ImageBackground>
      </View>
    );
  }
}

const style = StyleSheet.create({
  background: {
    height: '100%',
    paddingTop: 20,
  },
  container: {
    height: '100%',
  },
  separator: {
    borderColor: 'black',
    borderWidth: 0.55,
    margin: 15,
    marginBottom: 24,
    marginTop: 24,
  },
  typeImage: {
    opacity: 0.1,
    resizeMode: 'contain',
  },
});

LocalDetail.propTypes = {
  navigation: PropTypes.object.isRequired,
};
