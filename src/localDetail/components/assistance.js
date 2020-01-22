import React, {Component} from 'react';
import {View, Text, TimePickerAndroid, StyleSheet} from 'react-native';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PropTypes} from 'prop-types';

export default class Assistance extends Component {
  render() {
    return (
      <View style={style.assistance}>
        <Text style={style.titleText}>¿Cuando vas a asistir?</Text>
        <View style={style.timePicker}>
          <Clock onPress={this.openTimePicker}>
            <Text>Hora de Inicio</Text>
          </Clock>
          <Clock onPress={this.openTimePicker}>
            <Text>Hora de Fin</Text>
          </Clock>
        </View>
      </View>
    );
  }

  openTimePicker() {
    TimePickerAndroid.open({
      hour: new Date().getHours(),
      is24Hour: true,
      minute: new Date().getMinutes(),
    });
  }
}

const style = StyleSheet.create({
  assistance: {
    flex: 3,
  },
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  titleText: {
    fontFamily: 'Roboto-Light',
    fontSize: 32,
    marginBottom: 15,
    textAlign: 'center',
  },
});

function Clock(props) {
  const style = StyleSheet.create({
    clock: {
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity onPress={props.onPress} style={style.clock}>
      <Text>{props.children}</Text>
      <FontAwesomeIcon icon={faClock} size={32}></FontAwesomeIcon>
    </TouchableOpacity>
  );
}

Clock.propTypes = {
  children: PropTypes.object,
  onPress: PropTypes.func,
};
