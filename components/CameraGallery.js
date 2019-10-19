import React from 'react'
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native'

import TouchableIcon from './TouchableIcon'

import Colors from '../constants/Colors'

const { width: winWidth } = Dimensions.get('window')

export default ({ captures = [], onCheckMarkPress, collectionEndpoint }) => (
  <ScrollView
    horizontal={true}
    style={[styles.bottomToolbar, styles.galleryContainer]}
  >
    {captures.map(({ uri }) => (
      <View style={styles.galleryImageContainer} key={uri}>
        <Image source={{ uri }} style={styles.galleryImage} />
      </View>
    ))}
    <TouchableIcon
      iconName="ios-checkmark-circle"
      iconColor={Colors.success}
      iconSize={60}
      iconStyle={styles.checkMarkIcon}
      onPress={() => onCheckMarkPress(collectionEndpoint)}
    />
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
  },
  checkMarkIcon: {
    top: 7
  }
})
