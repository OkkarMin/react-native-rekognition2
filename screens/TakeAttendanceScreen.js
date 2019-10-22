import React, { useState, useEffect } from 'react'
import { FlatList, Text, View, StyleSheet } from 'react-native'

import GroupCard from '../components/GroupCard'
import Colors from '../constants/Colors'
import groupsMockData from '../mock/Groups'

export default TakeAttendanceScreen = props => {
  const { navigate } = props.navigation
  const [courses, setCourses] = useState(null)

  useEffect(() => {
    setCourses(groupsMockData)
  }, [])

  handleGroupCardPress = collectionName =>
    navigate('Camera', { collectionName })

  return (
    <View style={styles.container}>
      <Text style={styles.greetings}>
        Welcome Professor! {'\n'} Here are your courses.
      </Text>

      {courses && (
        <FlatList
          data={courses}
          renderItem={({ item }) => (
            <GroupCard details={item} onPress={handleGroupCardPress} />
          )}
          keyExtractor={item => item.collectionName}
        />
      )}
    </View>
  )
}

TakeAttendanceScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 15,
    backgroundColor: Colors.background
  },
  greetings: {
    fontSize: 25,
    paddingTop: 10,
    textAlign: 'center',
    color: Colors.text
  }
})
