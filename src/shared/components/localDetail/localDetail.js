import React, {Component} from 'react';
import {Text} from 'react-native';
import {PropTypes} from 'prop-types';
import DetailHeader from '../headerLocalDetail/headerDetail';

export default class LocalDetail extends Component {
  static navigationOptions = props => {
    return {
      header: () => (
        <DetailHeader
          goBack={props.navigation.goBack}
          item={props.navigation.getParam('item')}></DetailHeader>
      ),
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <Text>{this.props.navigation.getParam('itemId')}</Text>;
  }
}

LocalDetail.propTypes = {
  navigation: PropTypes.object.isRequired,
};
