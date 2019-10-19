import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import TakeAttendanceScreen from '../screens/TakeAttendanceScreen'
import CameraScreen from '../screens/CameraScreen'
import GroupScreen from '../screens/GroupScreen'
import ViewAttendanceScreen from '../screens/ViewAttendanceScreen'
import ProfileScreen from '../screens/ProfileScreen'
import Colors from '../constants/Colors'

const TakeAttendanceStack = createStackNavigator({
  TakeAttendance: TakeAttendanceScreen,
  Group: GroupScreen,
  Camera: CameraScreen
})

TakeAttendanceStack.navigationOptions = {
  tabBarLabel: 'Take Attendance',
  tabBarOptions: {
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.tabIconDefault,
    style: {
      backgroundColor: Colors.background2
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="ios-create" />
  )
}

const ViewAttendanceStack = createStackNavigator({
  ViewAttendance: ViewAttendanceScreen
})

ViewAttendanceStack.navigationOptions = {
  tabBarLabel: 'View Attendance',
  tabBarOptions: {
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.tabIconDefault,
    style: {
      backgroundColor: Colors.background2
    }
  },
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-list" />
}

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
})

ProfileStack.navigationOptions = {
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
  TakeAttendanceStack,
  ViewAttendanceStack,
  ProfileStack
})

export default tabNavigator
