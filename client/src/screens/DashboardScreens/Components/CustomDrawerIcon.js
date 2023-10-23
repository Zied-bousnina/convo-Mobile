import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CustomDrawerIcon = () => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity
    style={{ position: 'absolute', top: 20, left: 20 }}
    onPress={() => navigation.openDrawer()}>
    <Ionicons name="menu" size={30} color="black" />
  </TouchableOpacity>
  )
}

export default CustomDrawerIcon