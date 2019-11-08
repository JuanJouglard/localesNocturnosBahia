import Map from './src/core/components/Map/Map';
import Home from './src/core/components/Home/Home';
import Profile from './src/core/components/Profile/Profile';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

const tabNavigator = createBottomTabNavigator({
  Home: Home,
  Map: Map,
  Profile: Profile
});

export default createAppContainer(tabNavigator);
