import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../constants/Colors'

export default GroupScreen = props => {
  const { params } = props.navigation.state

  return (
    <View style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <Text>{params.name}</Text>
    </View>
  )
}

GroupScreen.navigationOptions = {
  title: 'Groups',
  headerStyle: {
    backgroundColor: Colors.background
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: Colors.background
  }
})
