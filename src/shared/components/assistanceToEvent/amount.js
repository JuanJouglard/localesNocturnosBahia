import React from 'react';
import {Text, View} from 'react-native';
import {style} from '../details/eventDetailStyles';
import {PropTypes} from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFemale, faMale} from '@fortawesome/free-solid-svg-icons';

export default function Amount(props) {
  return (
    <View style={[style.quantity, style.alignCenter]}>
      <FontAwesomeIcon icon={faMale} size={36}></FontAwesomeIcon>
      <FontAwesomeIcon icon={faFemale} size={36}></FontAwesomeIcon>
      <Text style={style.quantityText}>{props.quantity}</Text>
    </View>
  );
}

Amount.propTypes = {
  quantity: PropTypes.number,
};
