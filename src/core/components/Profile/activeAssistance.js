import React, {Component} from 'react';
import UserService from '../../../shared/services/user';
import {FlatList} from 'react-native-gesture-handler';
import ActiveAssistanceEntry from './activeAssitanceEntry';
import AttendanceService from '../../../localDetail/services/attendance';
import AlertsService from '../../../shared/services/alerts';
import ToasterService from '../../../shared/services/toaster';
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
    this.attendanceService.getActiveAttendance(userId).then(response => {
      this.setState({actives: response.data.attendanceData});
    });
  };

  render() {
    return (
      <FlatList
        data={this.state.actives}
        renderItem={this.renderItem}
        keyExtractor={item => item.activeId.toString()}></FlatList>
    );
  }

  renderItem = ({item}) => {
    return (
      <ActiveAssistanceEntry
        item={item}
        onPress={this.removeAssitance}></ActiveAssistanceEntry>
    );
  };

  removeAssitance = id => () => {
    this.alertService.showConfirmationDialog(
      'Borrar',
      'Esta seguro que quiere borrar este registro?',
      this.deleteEntry(id),
    );
  };

  deleteEntry = id => () => {
    this.attendanceService.removeAssitance(id).then(() => {
      this.setState(prevState => {
        const arrayWithoutElement = prevState.actives.filter(
          active => active.activeId !== id,
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
