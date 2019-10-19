import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import SwitchToggle from "react-native-switch-toggle";

import Colors from "../constants/Colors";

export default ToggleButton = ({ value, matricNo }) => {
  const [switchOn, setSwitchOn] = useState(value);

  return (
    <View style={styles.container}>
      <Text style={styles.greetings}>{matricNo}</Text>

      <SwitchToggle
        switchOn={switchOn}
        circleColorOff="red"
        circleColorOn="green"
        onPress={() => (switchOn ? null : setSwitchOn(!switchOn))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 15,
    backgroundColor: Colors.background,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  greetings: {
    fontSize: 15,
    textAlign: "center",
    color: Colors.text
  }
});
