import Bambudo from '../../pages/Bambudo';
import Settings from '../../pages/Settings';
import Profile from '../../pages/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import styles from './style';
import NewPost from '../../pages/NewPost';
import { View } from 'react-native'
import Liked from '../../pages/Liked';
import { NavigationStack } from '../NavigationStack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Header from '../Header';
import { color } from '../../config/color';
import { useContext } from 'react';
import { ThemeContext } from '../../store/ThemeContext';


const Tab = createBottomTabNavigator();

const Tabs = ({changeUserAuth}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      initialRouteName='Bambudo'
      tabBarOptions={{ showLabel: false }}
      screenOptions={{
        showLabel: false,
        tabBarStyle: {
          height: 70,
        },
        header: () => <Header  />,
      }}
    >
      <Tab.Screen name="Profile" component={Profile} lazy={true} options={
        {
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <IconAwesome name="pencil" size={30} color={focused ? 'white' : '#7A7A7A'} style={focused && { backgroundColor: theme.primaryColor, padding: 10, borderRadius: 30 }} />
          )
        }} />
      <Tab.Screen name="Liked" component={Liked} lazy={true}  options={
        {
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <IconAwesome name="heart" size={30} color={focused ? 'white' : '#7A7A7A'} style={focused && { backgroundColor: theme.primaryColor, padding: 10, borderRadius: 30 }} />
          )
        }}
      />
      <Tab.Screen name="NewPost" component={NewPost} lazy={true}
      options={
        {
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{...styles.circle, backgroundColor:theme.primaryColor}}>
              <IconAwesome name="plus" size={35} color='white' />
            </View>
          )
        }}
        
      />
      <Tab.Screen name="Bambudo" component={NavigationStack} lazy={true} options={({ route }) => ({
        headerShown: false,
        tabBarStyle: ((route) => {
          const routeName = getFocusedRouteNameFromRoute(route) 
          if (routeName === 'SinglePost') {
            return { display: "none" }
          }
          return {height: 70}
        })(route),

        tabBarIcon: ({ focused }) => (
          <Icon name="home" size={30} color={focused ? 'white' : '#7A7A7A'} style={focused && { backgroundColor: theme.primaryColor, padding: 10, borderRadius: 30 }} />
        )
        
      })}
      />
      <Tab.Screen name="Settings" component={Settings} 
      initialParams={{changeUserAuth:changeUserAuth}}
      options={
        {
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <Icon name="settings" size={30} color={focused ? 'white' : '#7A7A7A'} style={focused && { backgroundColor: theme.primaryColor, padding: 10, borderRadius: 30 }} />
          )
        }} />
    </Tab.Navigator>
  )
}

export default Tabs;