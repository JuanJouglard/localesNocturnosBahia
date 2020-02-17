import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {style} from '../details/eventDetailStyles';
import {Text, TouchableHighlight} from 'react-native';

export class EventButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.getButton(this.props.shouldDelete);
  }

  getButton(shouldDelete) {
    return (
      <TouchableHighlight
        style={[
          style.assistanceButton,
          this.props.shouldDelete ? style.deleteButton : style.registerButton,
        ]}
        onPress={
          this.props.shouldDelete ? this.props.onDelete : this.props.onRegister
        }>
        <Text style={[style.assistanceButtonText, style.robotoRegular]}>
          {shouldDelete ? 'Borrar' : 'Asistir'}
        </Text>
      </TouchableHighlight>
    );
  }
}

EventButton.propTypes = {
  disable: PropTypes.bool,
  onDelete: PropTypes.func,
  onRegister: PropTypes.func,
  shouldDelete: PropTypes.bool,
};
