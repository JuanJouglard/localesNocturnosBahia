import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListOfEntries, PlacesService, SearchInput} from '../../../shared';
import {TabView, TabBar} from 'react-native-tab-view';
import {Dimensions, StyleSheet, View} from 'react-native';
export default class Home extends Component {
  placesService;

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      index: 0,
      initialevents: [],
      initialplaces: [],
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

  filterArray = array => text => {
    this.setState(previousState => {
      return {
        [array]: previousState['initial' + array].filter(item =>
          item.name.toUpperCase().startsWith(text.toUpperCase()),
        ),
      };
    });
  };

  placesRoute = () => {
    return (
      <View>
        <SearchInput
          section={'Locales'}
          onInput={this.filterArray('places')}></SearchInput>
        <ListOfEntries
          style={style.list}
          onEntryPress={item =>
            this.props.navigation.navigate('Local', {
              item: item,
            })
          }
          list={this.state.places}></ListOfEntries>
      </View>
    );
  };

  eventsRoute = () => {
    return (
      <View>
        <SearchInput
          section={'Eventos'}
          onInput={this.filterArray('events')}></SearchInput>
        <ListOfEntries
          onEntryPress={item =>
            this.props.navigation.navigate('Local', {
              item: item,
            })
          }
          list={this.state.events}></ListOfEntries>
      </View>
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
      this.setState({initialplaces: places});
    });
    this.placesService.getEvents().then(events => {
      this.setState({events: events});
      this.setState({initialevents: events});
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
