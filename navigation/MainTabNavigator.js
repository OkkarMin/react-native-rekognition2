import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import GroupScreen from '../screens/GroupScreen'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/SettingsScreen'
import Colors from '../constants/Colors'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Group: GroupScreen
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: {
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.tabIconDefault,
    style: {
      backgroundColor: Colors.background2
    }
  },
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />
}

const LinksStack = createStackNavigator({
  Links: LinksScreen
})

LinksStack.navigationOptions = {
  tabBarLabel: 'Camera',
  tabBarOptions: {
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.tabIconDefault,
    style: {
      backgroundColor: Colors.background2
    }
  },
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-camera" />
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarOptions: {
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.tabIconDefault,
    style: {
      backgroundColor: Colors.background2
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="ios-contact" />
  )
}

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack
})

export default tabNavigator
