import React from 'react'
import { View, Image, ScrollView, StyleSheet } from 'react-native'

import styles from './styles'

export default ({ captures = [] }) => (
  <ScrollView
    horizontal={true}
    style={[styles.bottomToolbar, styles.galleryContainer]}
  >
    {captures.map(({ uri }) => (
      <View style={styles.galleryImageContainer} key={uri}>
        <Image source={{ uri }} style={styles.galleryImage} />
      </View>
    ))}
  </ScrollView>
)

const styles = StyleSheet.create({
  bottomToolbar: {
    width: winWidth,
    position: 'absolute',
    height: 100,
    bottom: 0
  },
  galleryContainer: {
    bottom: 100
  },
  galleryImageContainer: {
    width: 75,
    height: 75,
    marginRight: 5
  },
  galleryImage: {
    width: 75,
    height: 75
  }
})
