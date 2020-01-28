import React, {Component} from 'react';
import {Button, View, Text, TimePickerAndroid, StyleSheet} from 'react-native';
import DateService from '../services/date';
import TimeStamp from './Time';
import {Clock} from '../../shared/components/clock/Clock';

export default class Assistance extends Component {
  dateService;

  constructor(props) {
    super(props);
    this.dateService = DateService.getInstance();
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
        <Button title="Registrar" disabled></Button>
      </View>
    );
  }

  getFriendlyDate(date) {
    if (date) {
      const dateArray = date.match(/(\d*)-(\d*)-(\d*)T(\d*):(\d*).*Z/);
      const onlyDate = [dateArray[3], dateArray[2], dateArray[1]];
      return dateArray ? onlyDate.join('/') : null;
    } else return null;
  }

  getFriendlyTime(date) {
    if (date) {
      const dateArray = date.match(/(\d*)-(\d*)-(\d*)T(\d*):(\d*).*Z/);
      let fixedHour = dateArray[4] - 3;
      if (fixedHour < 0) fixedHour = 24 + fixedHour;
      if (fixedHour < 10) fixedHour = '0' + fixedHour;
      const onlyTime = [fixedHour, dateArray[5]];
      return dateArray ? onlyTime.join(':') : null;
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

const style = StyleSheet.create({
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
