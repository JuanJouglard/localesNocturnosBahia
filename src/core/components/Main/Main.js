import Map from '../Map/Map';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'; 
import { createAppContainer } from 'react-navigation';
import LocalDetail from '../../../shared/components/localDetail/localDetail';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faMap, faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const HomeNavigator = createStackNavigator({
    Home,
    Local: {
      screen: LocalDetail
    }
  },
  {
    initialRouteName: 'Home'
  });

const tabNavigator = createBottomTabNavigator({
    Home: {
      navigationOptions: {
        // eslint-disable-next-line react/display-name
      tabBarIcon: ({focused}) => { 
        if (focused) {
          return <FontAwesomeIcon color='#464646' icon={faHome} size={30}/>;
        }
        else {
          return <FontAwesomeIcon color='#C6C6C5' icon={faHome} size={30}/>;
        }
      }
      },
      screen: HomeNavigator,
    },
    Map: {
      navigationOptions: {
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({focused}) => { 
          if (focused) {
            return <FontAwesomeIcon color='#464646' icon={faMap} size={30}/>;
          }
          else {
            return <FontAwesomeIcon color='#C6C6C5' icon={faMap} size={30}/>;
          }
        }
      },
      screen: Map
    },
    Profile: {
      navigationOptions: {
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({focused}) => { 
          if (focused) {
            return <FontAwesomeIcon color='#464646' icon={faUser} size={30}/>;
          }
          else {
            return <FontAwesomeIcon color='#C6C6C5' icon={faUser} size={30}/>;
          }
        }
      },
      screen: Profile
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  });
  
export default createAppContainer(tabNavigator); 
