import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import SwitchToggle from 'react-native-switch-toggle'
import { updateAttendance } from '../utils/utils'

import Colors from '../constants/Colors'

export default ToggleButton = ({ value, data: studentData, courseCode }) => {
  const [switchOn, setSwitchOn] = useState(value)

  return (
    <View style={styles.container}>
      <Text style={styles.matricNo}>{studentData.matricNo}</Text>

      <SwitchToggle
        switchOn={switchOn}
        circleColorOff={Colors.background2}
        circleColorOn={Colors.primary}
        onPress={() => {
          studentData.courseCode = courseCode
          updateAttendance(studentData)
          setSwitchOn(!switchOn)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 15,
    backgroundColor: Colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  matricNo: {
    fontSize: 15,
    textAlign: 'center',
    color: Colors.text
  }
})
