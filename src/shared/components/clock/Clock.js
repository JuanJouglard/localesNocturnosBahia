import React from 'react';
import {Text, View, StyleSheet, TimePickerAndroid} from 'react-native';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {PropTypes} from 'prop-types';

export function Clock(props) {
  const style = StyleSheet.create({
    clock: {
      alignItems: 'center',
    },
    disabledButton: {
      opacity: 0.2,
    },
    enabledButton: {
      opacity: 1,
    },
    text: {
      fontFamily: 'Roboto-Regular',
      fontSize: 18,
      marginBottom: 10,
    },
  });

  const openPicker = () => {
    TimePickerAndroid.open({
      hour: 21,
      minute: 0,
      mode: 'spinner',
    }).then(props.onPress);
  };

  return (
    <TouchableHighlight
      underlayColor={'rgba(255,0,0,0)'}
      activeOpacity={0}
      onPress={openPicker}
      style={!props.disabled ? [style.enabledButton] : [style.disabledButton]}
      disabled={props.disabled}>
      <View style={style.clock}>
        {props.children}
        <FontAwesomeIcon icon={faClock} size={32}></FontAwesomeIcon>
      </View>
    </TouchableHighlight>
  );
}

Clock.propTypes = {
  children: PropTypes.object,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};
