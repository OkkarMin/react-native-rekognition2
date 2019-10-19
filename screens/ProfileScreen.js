import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

import Colors from '../constants/Colors'

import professorsMockData from '../mock/Professors'

export default ProfileScreen = props => {
  const { navigate } = props.navigation

  handleLogoutPress = () => {
    navigate('Login')
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.title}>
            Welcome Professor {professorsMockData[0].full_name}
          </Text>

          <Image
            style={styles.avatar}
            source={{
              uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'
            }}
          />

          <Text style={styles.outerdetails}>
            Name: {'\t'}
            <Text style={styles.details}>
              {professorsMockData[0].full_name}
            </Text>
            {'\n'}Email: {'\t'}
            <Text style={styles.details}>{professorsMockData[0].email}</Text>
            {'\n'}Position: {'\t'}
            <Text style={styles.details}>{professorsMockData[0].position}</Text>
          </Text>
        </View>
      </View>
      <Button
        title="Logout"
        buttonStyle={styles.logoutButton}
        onPress={handleLogoutPress}
      />
    </View>
  )
}

ProfileScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: '10%',
    backgroundColor: Colors.background
  },
  body: {
    flex: 1,
    marginTop: 10
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5
  },
  title: {
    flex: 3,
    fontSize: 27,
    height: 75,
    textAlign: 'center',
    color: '#fff'
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: 'white',
    marginBottom: 30,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 150
  },
  outerdetails: {
    flex: 5,
    marginTop: 200,
    fontSize: 20,
    color: '#fff',
    alignSelf: 'flex-start',
    width: '100%'
  },
  details: {
    flex: 5,
    marginTop: 100,
    fontSize: 20,
    color: '#fff',
    alignSelf: 'flex-start',
    width: '100%'
  },
  logoutButton: {
    backgroundColor: Colors.primary
  }
})
