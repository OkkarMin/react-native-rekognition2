import React from 'react'
import { Input, Icon } from 'react-native-elements'

export default FormTextInput = props => {
  const { placeholder, iconName, onChangeText } = props

  return (
    <Input
      placeholder={placeholder}
      placeholderTextColor="grey"
      leftIcon={<Icon name={iconName} type="font-awesome" color="white" />}
      paddingLeft="5%"
      inputStyle={{ color: 'white' }}
      onChangeText={onChangeText}
    />
  )
}
