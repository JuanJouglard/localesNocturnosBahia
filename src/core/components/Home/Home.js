import React, {Component} from 'react';
import {PlacesService} from '../../../shared/services/places';
import PropTypes from 'prop-types';
import ListOfEntries from '../../../shared/components/listOfEntries/listOfEntries';
import {TabView, TabBar} from 'react-native-tab-view';
import {Dimensions, StyleSheet} from 'react-native';
export default class Home extends Component {
  placesService;

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      index: 0,
      places: [],
      routes: [
        {
          key: 'places',
          title: 'Locales',
        },
        {
          key: 'events',
          title: 'Eventos',
        },
      ],
    };
  }

  placesRoute = () => {
    return (
      <ListOfEntries
        style={style.list}
        onEntryPress={item =>
          this.props.navigation.navigate('Local', {
            item: item,
          })
        }
        list={this.state.places}></ListOfEntries>
    );
  };

  eventsRoute = () => {
    return (
      <ListOfEntries
        onEntryPress={item =>
          this.props.navigation.navigate('Local', {
            item: item,
          })
        }
        list={this.state.events}></ListOfEntries>
    );
  };

  renderScene = ({route}) => {
    switch (route.key) {
      case 'places':
        return this.placesRoute();
      case 'events':
        return this.eventsRoute();
      default:
        return null;
    }
  };

  renderTabBar = props => <TabBar {...props} style={style.tabs}></TabBar>;

  componentDidMount() {
    this.placesService = PlacesService.getInstance();
    this.placesService.getPlaces().then(places => {
      this.setState({places: places});
    });
    this.placesService.getEvents().then(events => {
      this.setState({events: events});
    });
  }

  render() {
    return (
      <TabView
        navigationState={{index: this.state.index, routes: this.state.routes}}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
        onIndexChange={index => this.setState({index: index})}
        initialLayout={{width: Dimensions.get('window').width}}></TabView>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const style = StyleSheet.create({
  list: {
    height: '100%',
    width: '100%',
  },
  tabs: {
    backgroundColor: '#656565',
  },
});
