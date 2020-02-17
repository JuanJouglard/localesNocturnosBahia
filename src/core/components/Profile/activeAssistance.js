import React, {Component} from 'react';
import {AlertsService, ToasterService, UserService} from '../../../shared/';
import {FlatList} from 'react-native-gesture-handler';
import ActiveAssistanceEntry from './activeAssitanceEntry';
import AttendanceService from '../../../localDetail/services/attendance';
import {PropTypes} from 'prop-types';

export default class ActiveAssistance extends Component {
  attendanceService;
  userService;
  alertService;
  toasterService;

  constructor(props) {
    super(props);
    this.attendanceService = AttendanceService.getInstance();
    this.userService = UserService.getInstance();
    this.alertService = AlertsService.getInstance();
    this.toasterService = ToasterService.getInstance();
    this.state = {
      actives: [],
    };
    this.props.navigation.addListener('willFocus', this.getActives);
  }

  componentDidMount() {
    this.getActives();
  }

  getActives = () => {
    const userId = this.userService.getCurrentLoggedUser().uid;
    this.attendanceService
      .getActiveAttendance(userId)
      .then(([places, events]) => {
        const placesData = this.getDataFromArray(places.docs);
        const placesDataWithRemove = this.addRemoveFunction(
          placesData,
          'Place',
        );
        const eventsData = this.getDataFromArray(events.docs);
        const eventsDataWithRemove = this.addRemoveFunction(
          eventsData,
          'Event',
        );
        this.setState({
          actives: placesDataWithRemove.concat(eventsDataWithRemove),
        });
      });
  };

  getDataFromArray(array) {
    return array.map(attendance => {
      return {...attendance.data(), activeId: attendance.id};
    });
  }

  addRemoveFunction(array, type) {
    return array.map(item => {
      return {
        ...item,
        removeEntry: this.attendanceService['removeAssistance' + type],
      };
    });
  }

  render() {
    return (
      <FlatList
        data={this.state.actives}
        renderItem={this.renderItem}
        keyExtractor={item => item.activeId.toString()}></FlatList>
    );
  }

  renderItem = ({item}) => {
    console.log(item);
    return (
      <ActiveAssistanceEntry
        item={item}
        onPress={this.removeAssitance(item)}></ActiveAssistanceEntry>
    );
  };

  removeAssitance = item => () => {
    this.alertService.showConfirmationDialog(
      'Borrar',
      'Esta seguro que quiere borrar este registro?',
      this.deleteEntry(item),
    );
  };

  deleteEntry = item => () => {
    item
      .removeEntry(item.activeId)()
      .then(() => {
        this.setState(prevState => {
          const arrayWithoutElement = prevState.actives.filter(
            active => active.activeId !== item.activeId,
          );
          return {actives: arrayWithoutElement};
        });
        this.toasterService.showToaster('Registro eliminado con exito');
      });
  };
}
ActiveAssistance.propTypes = {
  navigation: PropTypes.object,
};
