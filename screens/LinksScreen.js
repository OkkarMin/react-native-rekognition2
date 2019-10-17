import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import { ExpoLinksView } from '@expo/samples'

import Colors from '../constants/Colors'

export default LinksScreen = props => {
  const { params } = props.navigation.state

  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <ExpoLinksView />
      <Text>{params.name}</Text>
    </ScrollView>
  )
}

LinksScreen.navigationOptions = {
  title: 'Links',
  headerStyle: {
    backgroundColor: Colors.background
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: Colors.background
  }
})
