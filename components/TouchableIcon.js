import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default TouchableIcon = ({
  iconName,
  iconColor,
  iconSize,
  iconStyle,
  onPress
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name={iconName}
        color={iconColor}
        size={iconSize}
        style={iconStyle}
      />
    </TouchableOpacity>
  )
}
