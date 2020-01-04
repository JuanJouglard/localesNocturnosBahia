import Map from '../Map/Map';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

const tabNavigator = createBottomTabNavigator({
    Home: Home,
    Map: Map,
    Profile: Profile
  });
  
export default createAppContainer(tabNavigator); 