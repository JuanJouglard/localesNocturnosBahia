import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import StaticInfo from '../../../localDetail/components/staticPlaceInfo';
import * as images from '../../../core/images/images';
import AttendanceService from '../../../localDetail/services/attendance';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMale, faFemale} from '@fortawesome/free-solid-svg-icons';
import AlertsService from '../../services/alerts';
import ToasterService from '../../services/toaster';
import TimeStamp from '../../../localDetail/components/Time';
export default class EventDetail extends Component {
  attendanceService;
  alertService;
  toasterService;

  constructor(props) {
    super(props);
    this.attendanceService = AttendanceService.getInstance();
    this.alertService = AlertsService.getInstance();
    this.toasterService = ToasterService.getInstance();
    this.props.navigation.addListener('willFocus', () =>
      this.props.item.refreshAttendance().then(() => this.forceUpdate()),
    );
  }

  componentDidMount() {
    this.props.item.refreshAttendance().then(() => this.forceUpdate());
  }

  render() {
    return (
      <View style={style.container}>
        <ImageBackground
          imageStyle={style.typeImage}
          source={images[this.props.item.type + 'IMAGE']}
          style={style.background}>
          <View style={[style.info]}>
            <Text style={style.title}>{this.props.place.name}</Text>
            <StaticInfo item={this.props.place}></StaticInfo>
          </View>
          <View style={style.separator}></View>
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
            <View style={[style.quantity, style.alignCenter]}>
              <FontAwesomeIcon icon={faMale} size={36}></FontAwesomeIcon>
              <FontAwesomeIcon icon={faFemale} size={36}></FontAwesomeIcon>
              <Text style={style.quantityText}>{this.props.item.people}</Text>
            </View>
            <TouchableHighlight
              style={style.registerButton}
              onPress={this.registerAttendanceToEvent}>
              <Text style={[style.registerButtonText, style.robotoRegular]}>
                Asistir
              </Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>
      </View>
    );
  }

  registerAttendanceToEvent = () => {
    this.alertService.showConfirmationDialog(
      'Confirmar',
      this.getMessageForConfirmation(),
      () => {
        this.attendanceService
          .registerAttendanceToEvent(this.props.item.id)
          .then(() => {
            this.toasterService.showToaster('Asistencia registrada con exito');
            this.props.item.refreshAttendance().then(() => this.forceUpdate());
          });
      },
    );
  };

  //TODO: Move this logic to message service
  getMessageForConfirmation() {
    return `Esta seguro/a que quiere confirmar la asistencia a 
    ${this.props.item.name}`;
  }
}

const style = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  assistance: {
    flex: 2,
  },
  background: {
    height: '100%',
    paddingTop: 20,
  },
  border: {
    borderColor: 'black',
    borderWidth: 5,
  },
  container: {
    height: '100%',
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  greyBackground: {
    backgroundColor: '#e5e2e2',
    borderRadius: 5,
    padding: 8,
  },
  info: {
    flex: 1,
  },
  mediumFont: {
    fontSize: 14,
  },
  people: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  placeName: {
    textAlign: 'center',
  },
  quantity: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  quantityText: {
    fontFamily: 'Roboto-Thin',
    fontSize: 42,
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
    fontSize: 16,
  },
  robotoRegular: {
    fontFamily: 'Roboto-Regular',
  },
  separator: {
    borderColor: 'black',
    borderWidth: 0.55,
    margin: 15,
    marginBottom: 0,
    marginTop: 0,
  },
  title: {
    fontFamily: 'Roboto-Light',
    fontSize: 32,
    marginBottom: 15,
    textAlign: 'center',
  },
  typeImage: {
    opacity: 0.1,
    resizeMode: 'contain',
  },
});

EventDetail.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object,
  place: PropTypes.object,
};
