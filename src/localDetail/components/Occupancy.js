import React, {Component} from 'react';
import ProgressCircle from 'react-native-progress/Circle';
import {PropTypes} from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {Clock} from '../../shared/components/clock/Clock';

export default class Occupancy extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.occupancy}>
        <Text style={style.text}>Ocupacion</Text>
        <View style={style.container}>
          <Clock>
            <Text>Seleccionar Horario</Text>
          </Clock>
          <ProgressCircle
            progress={this.props.progress}
            size={80}
            color={this.getColorFromProgress(this.props.progress)}
            showsText={true}
            formatText={this.formatText(this.props.progress)}></ProgressCircle>
        </View>
      </View>
    );
  }

  formatText = progress => () => {
    return `${progress * 100}%`;
  };

  getColorFromProgress(progress) {
    return progress > 0.7 ? '#fb4949' : '#01bc40';
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  occupancy: {
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto-Light',
    fontSize: 32,
    marginBottom: 15,
  },
});

Occupancy.propTypes = {
  progress: PropTypes.number,
};
