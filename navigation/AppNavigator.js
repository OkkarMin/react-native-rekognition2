import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import LoginStack from './LoginStack'
import MainTabNavigator from './MainTabNavigator'

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Login: LoginStack,
      Main: MainTabNavigator
    },
    { initialRouteName: 'Login' }
  )
)
