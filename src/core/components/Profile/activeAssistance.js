import React, {Component} from 'react';
import UserService from '../../../shared/services/user';
import {FlatList} from 'react-native-gesture-handler';
import ActiveAssistanceEntry from './activeAssitanceEntry';
import AttendanceService from '../../../localDetail/services/attendance';

export default class ActiveAssistance extends Component {
  attendanceService;
  userService;

  constructor() {
    super();
    this.attendanceService = AttendanceService.getInstance();
    this.userService = UserService.getInstance();
    this.state = {
      actives: [],
    };
  }

  componentDidMount() {
    const userId = this.userService.getCurrentLoggedUser().uid;
    this.attendanceService.getActiveAssistance(userId).then(console.log);
  }

  render() {
    return (
      <FlatList
        data={this.state.actives}
        renderItem={this.renderItem}
        keyExtractor={item => item.id.toString()}></FlatList>
    );
  }

  renderItem = ({item}) => {
    return <ActiveAssistanceEntry item={item}></ActiveAssistanceEntry>;
  };
}
