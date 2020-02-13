import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {ImageBackground, View, Text} from 'react-native';
import StaticInfo from '../../../localDetail/components/staticPlaceInfo';
import * as images from '../../../core/images/images';
import {style} from './eventDetailStyles';
import AssitanceToEvent from '../assistanceToEvent/assistanceToEvent';

//REFACTOR THIS
export default class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.props.navigation.addListener('willFocus', () =>
      this.props.item.refreshAttendance().then(() => this.forceUpdate()),
    );
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
          <AssitanceToEvent item={this.props.item}></AssitanceToEvent>
        </ImageBackground>
      </View>
    );
  }
}

EventDetail.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object,
  place: PropTypes.object,
};
