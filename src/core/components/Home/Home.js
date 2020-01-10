import React, {Component} from 'react';
import {PlacesService} from '../../services.js/places';
import PropTypes from 'prop-types';
import ListOfEntries from '../../../shared/components/listOfEntries/listOfEntries';

export default class Home extends Component {
  placesService;

  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    this.placesService = PlacesService.getInstance();
    this.placesService.getPlaces().then(places => {
      this.setState({places: places.docs});
    });
  }

  render() {
    return (
      <ListOfEntries
        onEntryPress={item =>
          this.props.navigation.navigate('Local', {
            item: item,
          })
        }
        list={this.state.places.map(this.extractData)}></ListOfEntries>
    );
  }

  extractData = item => item.data();
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};
