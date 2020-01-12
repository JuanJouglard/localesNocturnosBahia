import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcDiscover,
} from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';

export default class CreditCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.acceptedCreditCards.map((card, i) => {
      let icon;
      switch (card) {
        case 'Visa':
          icon = faCcVisa;
          break;
        case 'Mastercard':
          icon = faCcMastercard;
          break;
        case 'Amex':
          icon = faCcAmex;
          break;
        case 'Discover':
          icon = faCcDiscover;
          break;
      }
      return (
        <FontAwesomeIcon
          color={'#3378e0'}
          size={32}
          key={i}
          icon={icon}></FontAwesomeIcon>
      );
    });
  }
}

CreditCards.propTypes = {
  acceptedCreditCards: PropTypes.array,
};
