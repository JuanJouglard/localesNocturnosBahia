import React, {Component} from 'react';
import ProgressCircle from 'react-native-progress/Circle';
import {PropTypes} from 'prop-types';
import {StyleSheet, Text, TimePickerAndroid, View} from 'react-native';
import {Clock} from '../../shared/';
import DateService from '../services/date';
import TimeStamp from './Time';

export default class Occupancy extends Component {
  dateService;

  constructor(props) {
    super(props);
    this.dateService = DateService.getInstance();
    this.state = {selectedDate: null};
  }

  render() {
    return (
      <View style={style.occupancy}>
        <Text style={style.text}>Ocupación</Text>
        <View style={style.container}>
          <View>
            <Clock onPress={this.selectTime}>
              {(() => {
                if (!this.state.selectedDate)
                  return <Text>Seleccionar Horario</Text>;
              })()}
            </Clock>
            <TimeStamp
              date={this.state.selectedDate?.toLocaleDateString()}
              time={this.state.selectedDate?.toLocaleTimeString()}></TimeStamp>
          </View>
          <ProgressCircle
            progress={this.props.progress}
            size={80}
            color={this.getColorFromProgress(this.props.progress)}
            showsText={true}
            formatText={this.formatText(this.props.progress)}></ProgressCircle>
        </View>
      </View>
    );
  }

  formatText = progress => () => {
    return `${progress * 100}%`;
  };

  getColorFromProgress(progress) {
    return progress > 0.7 ? '#fb4949' : '#01bc40';
  }

  selectTime = selectedTime => {
    if (selectedTime.action !== TimePickerAndroid.dismissedAction) {
      const now = new Date();
      const selectedDate = this.dateService.getProperDate(now, selectedTime);
      this.setState({selectedDate: selectedDate});
      this.props.onTimeSelection(selectedDate);
    }
  };
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  occupancy: {
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto-Light',
    fontSize: 32,
    marginBottom: 15,
  },
});

Occupancy.propTypes = {
  onTimeSelection: PropTypes.func,
  progress: PropTypes.number,
};
