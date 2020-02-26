import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {PropTypes} from 'prop-types';
import {style} from '../details/eventDetailStyles';
import TimeStamp from '../../../localDetail/components/Time';
import Amount from './amount';
import {AlertsService, ToasterService, MessagesService} from '../../../shared';
import AttendanceService from '../../../localDetail/services/attendance';
import {EventButton} from './button';

export default class AssitanceToEvent extends Component {
  attendanceService;
  alertService;
  toasterService;
  messageService;

  constructor(props) {
    super(props);
    this.attendanceService = AttendanceService.getInstance();
    this.alertService = AlertsService.getInstance();
    this.toasterService = ToasterService.getInstance();
    this.messageService = MessagesService.getInstance();

    this.state = {
      activeId: null,
      hasActiveAttendance: true,
    };
  }

  componentDidMount() {
    this.props.item.refreshAttendance().then(() => this.forceUpdate());
    this.refreshAttendance();
  }

  render() {
    return (
      <View style={style.people}>
        <Text style={style.title}>Asistencia</Text>
        <View style={style.dates}>
          <View style={[style.alignCenter, style.greyBackground]}>
            <Text style={[style.robotoLight, style.mediumFont]}>
              Inicio del evento
            </Text>
            <TimeStamp
              time={this.props.item.startDate.toDate().toLocaleTimeString()}
              date={this.props.item.startDate
                .toDate()
                .toLocaleDateString()}></TimeStamp>
          </View>
          <View style={[style.alignCenter, style.greyBackground]}>
            <Text style={[style.robotoLight, style.mediumFont]}>
              Fin del evento
            </Text>
            <TimeStamp
              time={this.props.item.endDate.toDate().toLocaleTimeString()}
              date={this.props.item.endDate
                .toDate()
                .toLocaleDateString()}></TimeStamp>
          </View>
        </View>
        <Amount quantity={this.props.item.people}></Amount>
        <EventButton
          onRegister={this.registerAttendanceToEvent}
          onDelete={this.deleteAttendanceToEvent}
          shouldDelete={this.state.hasActiveAttendance}></EventButton>
      </View>
    );
  }

  performAction = (type, onConfirmation) => {
    this.alertService.showConfirmationDialog(
      'Confirmar',
      this.getAlertMessage(),
      () => {
        onConfirmation().then(() => {
          this.toasterService.showToaster('Operacion realizada con éxito');
          this.props.item.refreshAttendance().then(() => this.forceUpdate());
          this.refreshAttendance();
        });
      },
    );
  };

  getAlertMessage(type) {
    if (type === 'register')
      return this.messageService.getConfirmationMessageForEvent(
        this.props.item.name,
      );
    else
      return this.messageService.getDeleteMessageForEvent(this.props.item.name);
  }

  registerAttendanceToEvent = () => {
    this.performAction(
      'register',
      this.attendanceService.registerAttendanceToEvent(
        this.props.item.id,
        this.props.item.name,
      ),
    );
  };

  deleteAttendanceToEvent = () => {
    this.performAction(
      'delete',
      this.attendanceService.removeAssistanceEvent(this.state.activeId),
    );
  };

  refreshAttendance() {
    this.attendanceService
      .getEventAttendanceByUserId(this.props.item.id)
      .then(response => {
        this.setState({
          activeId: response.docs[0]?.id,
          hasActiveAttendance: !!response.docs.length,
        });
      });
  }
}

AssitanceToEvent.propTypes = {
  item: PropTypes.object,
};
