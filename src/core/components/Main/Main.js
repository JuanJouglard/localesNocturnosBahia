import Map from '../Map/Map';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LocalDetail from '../../../shared/components/localDetail/localDetail';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faMapPin, faUser} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const iconForTab = icon => ({focused}) => {
  if (focused) {
    return <FontAwesomeIcon color="#464646" icon={icon} size={30} />;
  } else {
    return <FontAwesomeIcon color="#C6C6C5" icon={icon} size={30} />;
  }
};

const tabNavigator = createBottomTabNavigator(
  {
    Home: {
      navigationOptions: {
        tabBarIcon: iconForTab(faHome),
      },
      screen: Home,
    },
    Map: {
      navigationOptions: {
        tabBarIcon: iconForTab(faMapPin),
      },
      screen: Map,
    },
    Profile: {
      navigationOptions: {
        tabBarIcon: iconForTab(faUser),
      },
      screen: Profile,
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
    },
  },
);

const HomeNavigator = createStackNavigator(
  {
    Local: {
      screen: LocalDetail,
    },
    Main: {
      navigationOptions: {
        headerShown: false,
      },
      screen: tabNavigator,
    },
  },
  {
    initialRouteName: 'Main',
  },
);

export default createAppContainer(HomeNavigator);
