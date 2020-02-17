import React, {Component} from 'react';
import {Text, TouchableHighlight} from 'react-native';
import {style} from './assistanceStyle';
import {PropTypes} from 'prop-types';

export class DetailButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.getButton(this.props.shouldDelete);
  }

  getButton(shouldDelete) {
    if (shouldDelete) return this.deleteButton();
    else return this.registerButton();
  }

  registerButton() {
    return (
      <TouchableHighlight
        onPress={this.props.onRegister}
        disabled={this.props.disabled}
        style={
          this.props.disabled
            ? [style.assistanceButton, style.registerButton, style.disabled]
            : [style.assistanceButton, style.registerButton]
        }>
        <Text style={style.assistanceButtonText}>Registrar</Text>
      </TouchableHighlight>
    );
  }

  deleteButton() {
    return (
      <TouchableHighlight
        onPress={this.props.onDelete}
        style={
          this.shouldDisableButton
            ? [style.assistanceButton, style.deleteButton, style.disabled]
            : [style.assistanceButton, style.deleteButton]
        }>
        <Text style={style.assistanceButtonText}>Borrar</Text>
      </TouchableHighlight>
    );
  }
}

DetailButton.propTypes = {
  disabled: PropTypes.bool,
  onDelete: PropTypes.func,
  onRegister: PropTypes.func,
  shouldDelete: PropTypes.bool,
};
