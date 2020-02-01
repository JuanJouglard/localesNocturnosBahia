import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function TimeStamp(props) {
  return (
    <View style={style.container}>
      <Text style={style.text}>{props.date}</Text>
      <Text style={style.text}>{props.time?.slice(0, -3)}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto-Light',
    fontSize: 20,
  },
});

TimeStamp.propTypes = {
  date: PropTypes.string,
  time: PropTypes.string,
  titleText: PropTypes.string,
};
