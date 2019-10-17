import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'

import Colors from '../constants/Colors'

export default GroupCard = ({ details, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(details.collectionName)}>
      <Card
        title={details.name}
        titleStyle={styles.cardTitle}
        containerStyle={styles.cardContainer}
      >
        <Text style={styles.collectionName}>{details.collectionName}</Text>
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardTitle: { color: Colors.text, fontSize: 15 },
  cardContainer: { backgroundColor: Colors.background2 },
  collectionName: { color: Colors.text, textAlign: 'center', fontSize: 15 }
})
