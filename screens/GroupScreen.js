import React, { useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import ToggleButton from "../components/ToggleButton";
import { fetchData, upperCaseArray } from "../utils/utils";
import Colors from "../constants/Colors";

export default GroupScreen = props => {
  const { navigation } = props;
  const [attendanceList, setAttendance] = useState();

  useEffect(() => {
    let arr = upperCaseArray(navigation.state.params.name);
    let endPointURL = `/getGroupAttendance/${arr[0]}${arr[1]}`;
    fetchData(
      "http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api",
      endPointURL
    ).then(result => {
      setAttendance(result);
      console.log(result);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greetings}>Attendance List</Text>

      {attendanceList && (
        <FlatList
          data={attendanceList}
          renderItem={({ item }) => (
            <ToggleButton
              value={item.status == "Present"}
              matricNo={item.matricNo}
            />
          )}
          keyExtractor={item => item.matricNo}
        />
      )}
    </View>
  );
};

GroupScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 15,
    backgroundColor: Colors.background
  },
  greetings: {
    fontSize: 15,
    textAlign: "center",
    color: Colors.text
  },
  collectionName: { color: Colors.text, textAlign: "center", fontSize: 15 },
  details: {
    flex: 5,
    marginTop: 100,
    fontSize: 20,
    color: "#fff",
    alignSelf: "flex-start",
    width: "100%"
  }
});
