/* TODO: REFACTOR */
import React, {Component} from 'react';
import {View, Text, TimePickerAndroid} from 'react-native';
import DateService from '../services/date';
import TimeStamp from './Time';
import {
  AlertsService,
  Clock,
  MessagesService,
  ToasterService,
} from '../../shared';
import AttendanceService from '../services/attendance';
import {PropTypes} from 'prop-types';
import {style} from './assistanceStyle';
import {DetailButton} from './detailButton';
export default class Assistance extends Component {
  dateService;
  attendanceService;
  alertService;
  messageService;
  toasterService;

  constructor(props) {
    super(props);
    this.dateService = DateService.getInstance();
    this.attendanceService = AttendanceService.getInstance();
    this.alertService = AlertsService.getInstance();
    this.messageService = MessagesService.getInstance();
    this.toasterService = ToasterService.getInstance();
    this.state = {
      activeId: null,
      endTime: null,
      hasActiveAttendance: true,
      startTime: null,
    };
  }

  componentDidMount() {
    this.refreshAttendance();
  }

  render() {
    return (
      <View style={style.assistance}>
        <Text style={[style.titleText]}>¿Cuándo vas a asistir?</Text>
        <View style={style.timePicker}>
          <View style={style.timeStamps}>
            <Clock
              onPress={this.openTimePicker('startTime')}
              disabled={this.state.hasActiveAttendance}>
              <Text style={[style.robotoRegular, style.marginBottom]}>
                Desde
              </Text>
            </Clock>
            <TimeStamp
              titleText="Desde"
              date={this.state.startTime?.toLocaleDateString()}
              time={this.state.startTime?.toLocaleTimeString()}></TimeStamp>
          </View>
          <View style={style.timeStamps}>
            <Clock
              onPress={this.openTimePicker('endTime')}
              disabled={
                this.state.startTime === null || this.state.hasActiveAttendance
              }>
              <Text style={[style.robotoRegular, style.marginBottom]}>
                Hasta
              </Text>
            </Clock>
            <TimeStamp
              titleText="Hasta"
              date={this.state.endTime?.toLocaleDateString()}
              time={this.state.endTime?.toLocaleTimeString()}></TimeStamp>
          </View>
        </View>
        <DetailButton
          onRegister={this.registerAssistance}
          onDelete={this.deleteAssistance}
          disabled={this.shouldDisableButton}
          shouldDelete={this.state.hasActiveAttendance}></DetailButton>
      </View>
    );
  }

  get shouldDisableButton() {
    return (
      !this.state.startTime ||
      !this.state.endTime ||
      this.state.hasActiveAttendance
    );
  }

  performAction = (type, onConfirmation) => {
    this.alertService.showConfirmationDialog(
      'Confirmar',
      this.getAlertMessage(type),
      async () =>
        onConfirmation().then(() => {
          this.toasterService.showToaster('Operacion realizada con exito');
          this.refreshAttendance();
        }),
    );
  };

  registerAssistance = async () => {
    this.performAction(
      'register',
      this.attendanceService.registerAttendance(
        this.props.item.id,
        this.props.item.name,
        this.state.startTime,
        this.state.endTime,
      ),
    );
  };

  deleteAssistance = () => {
    this.performAction(
      'delete',
      this.attendanceService.removeAssistancePlace(this.state.activeId),
    );
  };

  getAlertMessage = type => {
    if (type === 'register')
      return this.messageService.getRegistrationMessage(
        this.props.item.name,
        this.state.startTime,
        this.state.endTime,
      );
    else return this.messageService.getDeleteMessage(this.props.item.name);
  };

  openTimePicker = openClock => time => {
    if (time.action !== TimePickerAndroid.dismissedAction)
      this.setState(previousState => {
        return {
          [openClock]: this.dateService.validateTime(
            openClock,
            previousState.startTime,
            time,
          ),
        };
      });
  };

  refreshAttendance() {
    this.attendanceService
      .getActiveAttendanceByUserAndPlace(this.props.item.id)
      .then(response => {
        let newState = {
          endTime: null,
          hasActiveAttendance: false,
          startTime: null,
        };
        if (response.docs.length) {
          const activeAttendance = response.docs[0].data();
          newState = {
            activeId: response.docs[0].id,
            endTime: activeAttendance.endTime.toDate(),
            hasActiveAttendance: true,
            startTime: activeAttendance.startTime.toDate(),
          };
        }
        this.setState(newState);
      });
  }
}

Assistance.propTypes = {
  item: PropTypes.object,
};
