import React, { useState, useEffect } from 'react'
import { FlatList, Text, View, StyleSheet } from 'react-native'

import GroupCard from '../components/GroupCard'
import Colors from '../constants/Colors'
import groupsMockData from '../mock/Groups'
import { upperCaseArray } from '../utils/utils'

export default ViewAttendanceScreen = props => {
  const { navigate } = props.navigation
  const [courses, setCourses] = useState(null)

  useEffect(() => {
    setCourses(groupsMockData)
  }, [])

  handleGroupCardPress = collectionName => {
    let arr = upperCaseArray(collectionName)
    let courseCode = arr[0]
    let acadYear = 2019
    let semester = 1
    let groupID = arr[3]

    console.log(courseCode, acadYear, semester, groupID)

    navigate('Camera', {
      name: `${courseCode}/${acadYear}/${semester}/${groupID}`
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greetings}>
        Welcome Professor [name] here are your courses
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

ViewAttendanceScreen.navigationOptions = {
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
    fontSize: 15,
    textAlign: 'center',
    color: Colors.text
  }
})
