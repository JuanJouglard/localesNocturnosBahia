import React from 'react';
import {Text, StyleSheet, TimePickerAndroid} from 'react-native';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
      hour: new Date().getHours(),
      is24Hour: true,
      minute: new Date().getMinutes(),
    }).then(props.onPress);
  };

  return (
    <TouchableOpacity
      onPress={openPicker}
      style={
        !props.disabled
          ? [style.clock, style.enabledButton]
          : [style.clock, style.disabledButton]
      }
      disabled={props.disabled}>
      <Text style={style.text}>{props.children}</Text>
      <FontAwesomeIcon icon={faClock} size={32}></FontAwesomeIcon>
    </TouchableOpacity>
  );
}

Clock.propTypes = {
  children: PropTypes.object,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};
