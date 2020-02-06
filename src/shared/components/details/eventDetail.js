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
            <View style={style.quantity}>
              <FontAwesomeIcon icon={faMale} size={36}></FontAwesomeIcon>
              <FontAwesomeIcon icon={faFemale} size={36}></FontAwesomeIcon>
              <Text style={style.quantityText}>{this.props.item.people}</Text>
            </View>
          </View>
          <View style={style.separator}></View>
          <View style={style.assistance}>
            <Text style={style.title}>Asistir</Text>
            <TouchableHighlight
              style={style.registerButton}
              onPress={this.registerAttendanceToEvent}>
              <Text style={style.registerButtonText}>Registrar</Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>
      </View>
    );
  }

  registerAttendanceToEvent = () => {
    this.alertService.showConfirmationDialog(
      'Confirmar',
      `Esta seguro/a que quiere confirmar la asistencia a ${this.props.item.name}`,
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
}

const style = StyleSheet.create({
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
  info: {
    flex: 1,
  },
  people: {
    flex: 1,
  },
  placeName: {
    textAlign: 'center',
  },
  quantity: {
    alignItems: 'center',
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
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
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
