import React, {Component} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {PropTypes} from 'prop-types';
import {style} from '../details/eventDetailStyles';
import TimeStamp from '../../../localDetail/components/Time';
import Amount from './amount';
import {AlertsService, ToasterService, MessagesService} from '../../../shared';
import AttendanceService from '../../../localDetail/services/attendance';

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
        <TouchableHighlight
          disabled={this.state.hasActiveAttendance}
          style={[
            style.registerButton,
            this.state.hasActiveAttendance ? style.disabled : null,
          ]}
          onPress={this.registerAttendanceToEvent}>
          <Text style={[style.registerButtonText, style.robotoRegular]}>
            Asistir
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  registerAttendanceToEvent = () => {
    this.alertService.showConfirmationDialog(
      'Confirmar',
      this.messageService.getConfirmationMessageForEvent(this.props.item.name),
      () => {
        this.attendanceService
          .registerAttendanceToEvent(this.props.item.id, this.props.item.name)
          .then(() => {
            this.toasterService.showToaster('Asistencia registrada con exito');
            this.props.item.refreshAttendance().then(() => this.forceUpdate());
            this.refreshAttendance();
          });
      },
    );
  };

  refreshAttendance() {
    this.attendanceService
      .getEventAttendanceByUserId(this.props.item.id)
      .then(response => {
        this.setState({hasActiveAttendance: !!response.docs.length});
      });
  }
}

AssitanceToEvent.propTypes = {
  item: PropTypes.object,
};
