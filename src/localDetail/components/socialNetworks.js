import {View, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import React from 'react';
import {faInstagram, faFacebook} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {PropTypes} from 'prop-types';

export default function SocialNetworks(props) {
  const goToFacebook = () => {
    Linking.openURL(props.facebook);
  };

  const goToInstagram = () => {
    Linking.openURL(props.instagram);
  };

  return (
    <View style={style.social}>
      <TouchableOpacity onPress={goToInstagram}>
        <FontAwesomeIcon icon={faInstagram} size={32}></FontAwesomeIcon>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToFacebook}>
        <FontAwesomeIcon icon={faFacebook} size={32}></FontAwesomeIcon>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  social: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});

SocialNetworks.propTypes = {
  facebook: PropTypes.string,
  instagram: PropTypes.string,
};
