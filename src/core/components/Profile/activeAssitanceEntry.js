import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {PropTypes} from 'prop-types';
import Time from './time';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
export default class ActiveAssistanceEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.layout}>
        <Text style={style.placeName}>{this.props.item.placeName}</Text>
        <Time
          time={this.convertTimeStampToDate(this.props.item.startTime)}></Time>
        <Time
          time={this.convertTimeStampToDate(this.props.item.endTime)}></Time>
        <TouchableOpacity
          onPress={this.props.onPress(this.props.item.activeId)}>
          <FontAwesomeIcon
            icon={faTrashAlt}
            size={32}
            color={'#ff5454'}></FontAwesomeIcon>
        </TouchableOpacity>
      </View>
    );
  }

  convertTimeStampToDate(timestamp) {
    return new firestore.Timestamp(
      timestamp._seconds,
      timestamp._nanoseconds,
    ).toDate();
  }
}

const style = StyleSheet.create({
  layout: {
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    flexDirection: 'row',
    margin: 15,
    marginBottom: 0,
  },
  placeName: {
    flex: 2,
    fontFamily: 'Lobster-Regular',
    fontSize: 20,
    marginLeft: 10,
    textAlign: 'center',
  },
});

ActiveAssistanceEntry.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};
