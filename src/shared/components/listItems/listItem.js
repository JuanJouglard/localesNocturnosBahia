import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as images from '../../../core/images/images';
import {PropTypes} from 'prop-types';

export function EventItem(props) {
  return (
    <View style={style.container}>
      <Image style={style.image} source={images.PARTYIMAGE}></Image>
      <View style={style.text}>
        <Text style={style.title}>{props.item.name}</Text>
      </View>
    </View>
  );
}

EventItem.propTypes = {
  item: PropTypes.object,
};
PlaceItem.propTypes = {
  item: PropTypes.object,
};
export function PlaceItem(props) {
  return (
    <View style={style.container}>
      <Image
        style={style.image}
        source={images[props.item.type + 'IMAGE']}></Image>
      <View style={style.text}>
        <Text style={style.title}>{props.item.name}</Text>
        <Text>{props.item.friendlyType}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingTop: 5,
  },
  image: {
    height: 60,
    width: 60,
  },
  text: {
    alignItems: 'center',
    marginLeft: 10,
  },
  title: {
    fontFamily: 'Lobster-Regular',
    fontSize: 25,
  },
});
