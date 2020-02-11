import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FilterService, PlacesService} from '../../../shared';
import {TabView, TabBar} from 'react-native-tab-view';
import {Dimensions, StyleSheet} from 'react-native';
import {routes, componentToRoute} from './routes';

export default class Home extends Component {
  placesService;
  fitlerService;

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      index: 0,
      initialevents: [],
      initialplaces: [],
      places: [],
    };
    this.fitlerService = FilterService.getInstance();
    this.placesService = PlacesService.getInstance();
  }

  filterArray = array => text => {
    this.setState(previousState => {
      return {
        [array]: this.fitlerService.filter(
          previousState['initial' + array],
          'name',
          text,
        ),
      };
    });
  };

  //FIX THIS
  componentRoute = componentToRoute;

  renderScene = ({route}) => {
    return this.componentRoute(route);
  };

  renderTabBar = props => <TabBar {...props} style={style.tabs}></TabBar>;

  componentDidMount() {
    this.getItemsFromService('Events');
    this.getItemsFromService('Places');
  }

  getItemsFromService(type) {
    const formattedType = type.toLowerCase();
    this.placesService['get' + type]().then(items => {
      this.setState({
        [formattedType]: items,
        ['initial' + formattedType]: items,
      });
    });
  }

  render() {
    return (
      <TabView
        navigationState={{index: this.state.index, routes: routes}}
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
