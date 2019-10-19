import React, { useState } from "react";
import { Image, KeyboardAvoidingView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import FormTextInput from "../components/FormTextInput";
import Colors from "../constants/Colors";

export default LoginScreen = props => {
  const { navigate } = props.navigation;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        style={styles.logo}
        source={{ uri: "https://img.icons8.com/dusk/64/000000/face-id.png" }}
      />

      <FormTextInput
        iconName="user"
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />

      <FormTextInput
        iconName="lock"
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />

      <Button
        title="Login  "
        iconRight
        icon={<Icon name="arrow-right" size={15} color="white" />}
        buttonStyle={styles.loginButton}
        onPress={() => {
          if (username == "123" && password == "321") {
            valid = true;
            navigate("Main");
          }
        }}
      />
    </KeyboardAvoidingView>
  );
};

LoginScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.background
  },
  logo: {
    alignSelf: "center",
    width: 150,
    height: 150,
    marginBottom: 30,
    marginTop: 70
  },
  usernameInput: {
    color: Colors.primary,
    backgroundColor: Colors.background
  },
  loginButton: {
    backgroundColor: Colors.primary,
    marginTop: 50,
    marginHorizontal: 120,
    height: 40
  }
});
