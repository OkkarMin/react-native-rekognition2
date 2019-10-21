import React, { useState, useEffect } from 'react'
import { FlatList, Text, StyleSheet, ScrollView } from 'react-native'
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from 'accordion-collapse-react-native'
import { Separator } from 'native-base'

import ToggleButton from '../components/ToggleButton'
import { fetchData, upperCaseArray } from '../utils/utils'
import Colors from '../constants/Colors'

export default GroupScreen = props => {
  const { navigation } = props
  const [attendanceList, setAttendance] = useState()
  const [courseCodeNumber, setCourseCodeNumber] = useState()
  const [groupNumber, setGroupNumber] = useState()

  useEffect(() => {
    let arr = upperCaseArray(navigation.state.params.name)
    let endPointURL = `/getGroupAttendance/${arr[0]}${arr[1]}`
    fetchData(
      'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api',
      endPointURL
    ).then(result => {
      result.sort((a, b) => {
        return a.matricNo > b.matricNo
      })
      setAttendance(result)

      let arr2 = arr[0]
      arr2 = arr2.split('/')
      let arr3 = arr[1].split('/')
      setCourseCodeNumber(arr2[0])
      setGroupNumber(arr3[0])
    })
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greetings}>
        Course Code: {courseCodeNumber} {'\n'} Group Number: {groupNumber}
      </Text>

      <Collapse>
        <CollapseHeader>
          <Separator bordered style={styles.cardContainer}>
            <Text style={styles.collectionName}> 4 September 2019</Text>
          </Separator>
        </CollapseHeader>
        <CollapseBody>
          {attendanceList && (
            <FlatList
              style={styles.flatliststyle}
              data={attendanceList}
              renderItem={({ item }) => (
                <ToggleButton
                  value={item.status == 'Present'}
                  data={item}
                  courseCode={courseCodeNumber}
                />
              )}
              keyExtractor={item => item.matricNo}
            />
          )}
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <Separator bordered style={styles.cardContainer}>
            <Text style={styles.collectionName}> 3 September 2019</Text>
          </Separator>
        </CollapseHeader>
        <CollapseBody>
          {attendanceList && (
            <FlatList
              style={styles.flatliststyle}
              data={attendanceList}
              renderItem={({ item }) => (
                <ToggleButton
                  value={item.status != 'Present'}
                  data={item}
                  courseCode={courseCodeNumber}
                />
              )}
              keyExtractor={item => item.matricNo}
            />
          )}
        </CollapseBody>
      </Collapse>
    </ScrollView>
  )
}

GroupScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingBottom: 100,
    paddingHorizontal: 15,
    backgroundColor: Colors.background
  },
  greetings: {
    fontSize: 25,
    textAlign: 'center',
    color: Colors.text
  },
  flatliststyle: {
    marginBottom: 30
  },
  collectionName: { color: Colors.text, textAlign: 'center', fontSize: 15 },
  details: {
    flex: 5,
    marginTop: 100,
    fontSize: 20,
    color: '#fff',
    alignSelf: 'flex-start',
    width: '100%'
  },
  cardContainer: { backgroundColor: Colors.background2, height: 50 }
})
