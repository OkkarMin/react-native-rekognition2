import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import SwitchToggle from 'react-native-switch-toggle'
import { putData } from '../utils/utils'

import Colors from '../constants/Colors'

export default ToggleButton = ({ value, data, courseCode }) => {
  const [switchOn, setSwitchOn] = useState(value)

  updateAttendance = async data => {
    console.log(data)
    let endPointURL = `/updateStudentAttendance`
    let payload = {
      courseCode: courseCode,
      groupID: data.groupID,
      classType: data.classType,
      date: data.date,
      status: switchOn ? 'Present' : 'Absent',
      acadYear: '2019',
      semester: '1',
      matricNo: data.matricNo,
      remarks: 'nil'
    }

    putData(
      'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api',
      endPointURL,
      payload
    ).then(result => console.log(result))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greetings}>{data.matricNo}</Text>

      <SwitchToggle
        switchOn={switchOn}
        circleColorOff={Colors.background2}
        circleColorOn={Colors.primary}
        onPress={async () => {
          setSwitchOn(!switchOn)
          updateAttendance(data)
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
  greetings: {
    fontSize: 15,
    textAlign: 'center',
    color: Colors.text
  }
})
