/* TODO: REFACTOR */
import React, {Component} from 'react';
import {View, Text, TimePickerAndroid, StyleSheet, Alert} from 'react-native';
import DateService from '../services/date';
import TimeStamp from './Time';
import {Clock} from '../../shared/components/clock/Clock';
import AttendanceService from '../services/attendance';
import {PropTypes} from 'prop-types';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default class Assistance extends Component {
  dateService;
  attendanceService;

  constructor(props) {
    super(props);
    this.dateService = DateService.getInstance();
    this.attendanceService = AttendanceService.getInstance();
    this.state = {
      endTime: null,
      startTime: null,
    };
  }

  render() {
    return (
      <View style={style.assistance}>
        <Text style={style.titleText}>¿Cuando vas a asistir?</Text>
        <View style={style.timePicker}>
          <View style={style.timeStamps}>
            <Clock onPress={this.openTimePicker('startTime')}>
              <Text>Desde</Text>
            </Clock>
            <TimeStamp
              titleText="Desde"
              date={this.getFriendlyDate(this.state.startTime)}
              time={this.getFriendlyTime(this.state.startTime)}></TimeStamp>
          </View>
          <View style={style.timeStamps}>
            <Clock
              onPress={this.openTimePicker('endTime')}
              disabled={this.state.startTime === null}>
              <Text>Hasta</Text>
            </Clock>
            <TimeStamp
              titleText="Hasta"
              date={this.getFriendlyDate(this.state.endTime)}
              time={this.getFriendlyTime(this.state.endTime)}></TimeStamp>
          </View>
        </View>
        <TouchableOpacity
          style={style.registerButton}
          onPress={this.registerAssistance}
          disabled={this.shouldDisableButton()}>
          <Text style={style.registerButtonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  shouldDisableButton() {
    return !this.state.startTime || !this.state.endTime;
  }

  registerAssistance = async () => {
    Alert.alert('Registrar asistencia', this.getAlertMessage(), [
      {text: 'Cancelar'},
      {
        onPress: async () =>
          await this.attendanceService.registerAttendance(
            this.props.item.id,
            this.state.startTime,
            this.state.endTime,
          ),
        text: 'Confirmar',
      },
    ]);
  };

  getAlertMessage = () => {
    return `Esta seguro/a que quiere confirmar la asistencia a ${
      this.props.item.name
    } desde las ${this.getFriendlyTime(
      this.state.startTime,
    )}  del ${this.getFriendlyDate(
      this.state.startTime,
    )}  hasta las  ${this.getFriendlyTime(
      this.state.endTime,
    )} del ${this.getFriendlyDate(this.state.endTime)}?`;
  };

  getFriendlyDate(date) {
    if (date) {
      return date.toLocaleDateString();
    } else return null;
  }

  getFriendlyTime(date) {
    if (date) {
      return date.toLocaleTimeString();
    } else return null;
  }

  openTimePicker = openClock => time => {
    if (time.action !== TimePickerAndroid.dismissedAction)
      this.setState(previousState => {
        return this.dateService.validateTime(
          openClock,
          previousState.startTime,
          time,
        );
      });
  };
}

Assistance.propTypes = {
  item: PropTypes.object,
};

const style = StyleSheet.create({
  assistance: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  registerButton: {
    alignSelf: 'center',
    backgroundColor: '#3378e0',
    borderRadius: 8,
    paddingBottom: 16,
    paddingLeft: 64,
    paddingRight: 64,
    paddingTop: 16,
  },
  registerButtonText: {
    color: 'white',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  timeStamps: {
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Roboto-Light',
    fontSize: 32,
    marginBottom: 15,
    textAlign: 'center',
  },
});
