import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {PropTypes} from 'prop-types';

export default function Time(props) {
  return (
    <View style={{alignItems: 'center', flex: 2}}>
      <Text style={style.text}>{props.time.toLocaleDateString()}</Text>
      <Text style={style.text}>
        {props.time.toLocaleTimeString().slice(0, -3)}
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Light',
  },
});

Time.propTypes = {
  time: PropTypes.object,
};
