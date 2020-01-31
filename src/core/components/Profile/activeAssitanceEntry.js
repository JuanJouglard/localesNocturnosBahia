import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {PropTypes} from 'prop-types';
import Time from './time';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AlertsService from '../../../shared/services/alerts';
import AttendanceService from '../../../localDetail/services/attendance';

export default class ActiveAssistanceEntry extends Component {
  alertService;
  attendanceService;

  constructor(props) {
    super(props);
    this.alertService = AlertsService.getInstance();
    this.attendanceService = AttendanceService.getInstance();
  }

  render() {
    return (
      <View style={style.layout}>
        <Text style={style.placeName}>{this.props.item.name}</Text>
        <Time time={this.props.item.startTime.toDate()}></Time>
        <Time time={this.props.item.endTime.toDate()}></Time>
        <TouchableOpacity onPress={this.removeAssitance}>
          <FontAwesomeIcon
            icon={faTrashAlt}
            size={32}
            color={'#ff5454'}></FontAwesomeIcon>
        </TouchableOpacity>
      </View>
    );
  }

  removeAssitance = () => {
    this.alertService.showConfirmationDialog(
      'Borrar',
      'Esta seguro que quiere borrar este registro?',
      this.deleteEntry,
    );
  };

  deleteEntry = () => {
    this.attendanceService.removeAssitance(this.props.item.activeId);
  };
}

const style = StyleSheet.create({
  layout: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  placeIcon: {
    height: 32,
    width: 32,
  },
  placeName: {
    fontFamily: 'Lobster-Regular',
    fontSize: 20,
  },
});

ActiveAssistanceEntry.propTypes = {
  item: PropTypes.object,
};
