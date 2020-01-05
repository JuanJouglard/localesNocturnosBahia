import Map from '../Map/Map';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'; 
import { createAppContainer } from 'react-navigation';
import LocalDetail from '../../../shared/components/localDetail/localDetail';

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
    Home: HomeNavigator,
    Map: Map,
    Profile: Profile
  });
  
export default createAppContainer(tabNavigator); 
