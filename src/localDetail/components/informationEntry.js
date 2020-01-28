import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Text, View} from 'react-native';
import {PropTypes} from 'prop-types';

export default function InformationDetail(props) {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <FontAwesomeIcon icon={props.icon} size={props.size}></FontAwesomeIcon>
      <Text
        style={{
          fontSize: props.size,
          marginLeft: 8,
        }}>
        {props.information}
      </Text>
    </View>
  );
}

InformationDetail.propTypes = {
  icon: PropTypes.object,
  information: PropTypes.string,
  size: PropTypes.number,
};
