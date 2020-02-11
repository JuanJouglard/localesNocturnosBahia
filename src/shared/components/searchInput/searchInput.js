import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {PropTypes} from 'prop-types';

export default function SearchInput(props) {
  return (
    <TextInput
      onChangeText={props.onInput}
      style={style.textInput}
      placeholder={`Buscar ${props.section}...`}></TextInput>
  );
}

SearchInput.propTypes = {
  onInput: PropTypes.func,
  section: PropTypes.string,
};

const style = StyleSheet.create({
  textInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderColor: '#e5e2e2',
    borderWidth: 5,
    fontSize: 16,
    height: 64,
    padding: 10,
    width: '100%',
  },
});
